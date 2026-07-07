import { useState } from "react";
import type React from "react";
import {
  G, F, M, CRITERIA, SCORE_LABELS, SCORE_COLORS, SCORE_BG, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, EQUAL_WEIGHTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, scoreToPercent, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, ScoreBadge, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";
import { formatFee } from "./PlayerSessionScreens";

export type CreateDraft = {
  title: string; description: string; date: string; time: string;
  sport: Sport; approvalType: ApprovalType; maxParticipants: string; fee: string;
  scorerName: string;
};

export function CreateStep1({ onBack, onSave }: {
  onBack: () => void;
  onSave: (draft: CreateDraft) => void;
}) {
  const [draft, setDraft] = useState<CreateDraft>({
    title: "", description: "", date: "", time: "",
    sport: "Cầu lông", approvalType: "auto", maxParticipants: "16", fee: "0", scorerName: "",
  });
  const upd = (k: keyof CreateDraft) => (v: string) => setDraft(p => ({ ...p, [k]: v }));
  const valid = draft.title.trim() && draft.date && draft.time;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="relative px-5 pt-12 pb-5" style={{ background: "linear-gradient(135deg,#002d0f,#006e26)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src={imgCourt} alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10">
          <BackBtn onClick={onBack} light />
          <h1 className="text-white text-[20px] font-bold mt-3" style={{ fontFamily: F }}>Tạo buổi đánh giá</h1>
          <p className="text-white/60 text-[12px] mt-0.5" style={{ fontFamily: F }}>{OWNER_VENUE}</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        <IOSInput label="Tên buổi đánh giá" placeholder="VD: Đánh giá trình độ tháng 7" value={draft.title} onChange={upd("title")} />
        <IOSInput label="Người chấm điểm" placeholder="VD: Nguyễn Văn A" value={draft.scorerName} onChange={upd("scorerName")} />
        <IOSTextarea label="Mô tả" placeholder="Mô tả ngắn về buổi đánh giá, yêu cầu trình độ..." value={draft.description} onChange={upd("description")} />

        <div className="grid grid-cols-2 gap-3">
          <IOSInput label="Ngày" placeholder="" type="date" value={draft.date} onChange={upd("date")} />
          <IOSInput label="Giờ" placeholder="" type="time" value={draft.time} onChange={upd("time")} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <IOSInput label="Số người tối đa" placeholder="16" type="number" value={draft.maxParticipants} onChange={upd("maxParticipants")} />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Lệ phí (VNĐ)</p>
            <div className="relative bg-white rounded-xl border border-[#e5ebe4] focus-within:border-[#006e26] flex items-center transition-colors">
              <input type="number" placeholder="0"
                value={draft.fee === "0" ? "" : draft.fee}
                onChange={e => setDraft(p => ({ ...p, fee: e.target.value || "0" }))}
                className="flex-1 bg-transparent px-4 py-3.5 text-[15px] text-[#1a1a1a] placeholder-[#c0cdbf] outline-none w-0"
                style={{ fontFamily: F }} />
              <span className="pr-3 text-[12px] text-[#9ca3af] flex-shrink-0" style={{ fontFamily: F }}>đ</span>
            </div>
            {draft.fee !== "0" && Number(draft.fee) > 0 ? (
              <p className="text-[11px] text-[#006e26] px-1" style={{ fontFamily: F }}>
                = {Number(draft.fee).toLocaleString("vi-VN")} VNĐ
              </p>
            ) : (
              <p className="text-[11px] text-[#9ca3af] px-1" style={{ fontFamily: F }}>Để trống = miễn phí</p>
            )}
          </div>
        </div>

        {/* Sport selector */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Môn thể thao</p>
          <div className="grid grid-cols-3 gap-2">
            {(["Cầu lông", "Tennis", "Pickleball"] as Sport[]).map(s => (
              <button key={s} onClick={() => setDraft(p => ({ ...p, sport: s }))}
                className={`rounded-xl py-2.5 text-[13px] font-semibold border-2 transition-all ${draft.sport === s ? "border-[#006e26] bg-[#e8f5ee] text-[#006e26]" : "border-[#e5ebe4] bg-white text-[#5a6a59]"}`}
                style={{ fontFamily: F }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        

        <Btn onClick={() => onSave(draft)} disabled={!valid}>Tạo buổi đánh giá</Btn>
        <Btn variant="ghost" onClick={onBack}>Hủy</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── CREATE STEP 2 ────────────────────────────────────────────────────────────
export function CreateStep2({ draft, onBack, onSave }: {
  draft: CreateDraft;
  onBack: () => void;
  onSave: (weights: Record<string, number>) => void;
}) {
  const [weights, setWeights] = useState<Record<string, number>>(EQUAL_WEIGHTS);
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const isValid = total === 100;

  const setW = (id: string, val: number) => {
    setWeights(p => ({ ...p, [id]: Math.max(0, Math.min(100, val)) }));
  };

  const balance = () => setWeights(EQUAL_WEIGHTS);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="relative px-5 pt-12 pb-5" style={{ background: "linear-gradient(135deg,#002d0f,#006e26)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src={imgCourt} alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10">
          <BackBtn onClick={onBack} light />
          <h1 className="text-white text-[20px] font-bold mt-3" style={{ fontFamily: F }}>Tiêu chí đánh giá</h1>
          <p className="text-white/70 text-[12px] mt-0.5" style={{ fontFamily: F }}>{draft.title}</p>
          <div className="flex items-center gap-2 mt-2">
            {["Thông tin cơ bản", "Tiêu chí đánh giá"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                {i > 0 && <div className="w-8 h-px bg-white/60" />}
                <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${i === 1 ? "bg-white text-[#006e26]" : "bg-white/40 text-white"}`} style={{ fontFamily: M }}>
                  {i === 0 ? "✓" : "2"}
                </div>
                <span className="text-[11px] font-medium text-white" style={{ fontFamily: F }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        {/* Info box */}
        <div className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-3.5 flex gap-2.5">
          <span className="text-lg">💡</span>
          <div>
            <p className="text-[#92400e] text-[12px] font-semibold" style={{ fontFamily: F }}>Thang điểm 1–5</p>
            <p className="text-[#92400e] text-[11px] mt-0.5" style={{ fontFamily: F }}>
              Yếu · Trung bình · Khá · Tốt · Xuất sắc<br />
              Trọng số 5 tiêu chí phải tổng = 100%
            </p>
          </div>
        </div>

        {/* Total indicator */}
        <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-[#eef2ec]">
          <span className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Tổng trọng số</span>
          <div className="flex items-center gap-2">
            <span className={`text-[18px] font-black ${isValid ? "text-[#006e26]" : "text-[#dc2626]"}`} style={{ fontFamily: M }}>{total}%</span>
            <button onClick={balance} className="text-[11px] bg-[#e8f5ee] text-[#006e26] font-semibold px-2 py-1 rounded-lg" style={{ fontFamily: F }}>Cân bằng</button>
          </div>
        </div>

        {/* Criteria weight sliders */}
        {CRITERIA.map(c => (
          <div key={c.id} className="bg-white rounded-2xl p-4 border border-[#eef2ec]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{c.emoji}</span>
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{c.name}</p>
                <p className="text-[10px] text-[#7a8a79]" style={{ fontFamily: F }}>{c.sub}</p>
              </div>
              <div className="ml-auto w-12 h-8 rounded-xl flex items-center justify-center" style={{ background: isValid && weights[c.id] > 0 ? "#e8f5ee" : "#f3f4f6" }}>
                <span className="font-black text-[14px]" style={{ fontFamily: M, color: isValid && weights[c.id] > 0 ? G : "#9a9a9a" }}>
                  {weights[c.id]}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setW(c.id, weights[c.id] - 5)} className="w-7 h-7 rounded-full bg-[#f3f4f6] text-[#6b7280] font-bold text-lg flex items-center justify-center">−</button>
              <input type="range" min={0} max={100} step={5} value={weights[c.id]} onChange={e => setW(c.id, Number(e.target.value))}
                className="flex-1 accent-[#006e26]" />
              <button onClick={() => setW(c.id, weights[c.id] + 5)} className="w-7 h-7 rounded-full bg-[#e8f5ee] text-[#006e26] font-bold text-lg flex items-center justify-center">+</button>
            </div>
          </div>
        ))}

        <Btn onClick={() => onSave(weights)} disabled={!isValid}>
          Tạo buổi đánh giá
        </Btn>
        <Btn variant="ghost" onClick={onBack}>Quay lại</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── OWNER HOME ───────────────────────────────────────────────────────────────
export function OwnerHomeScreen({ sessions, onSessionTap, onCreate }: {
  sessions: Session[]; onSessionTap: (id: number) => void; onCreate: () => void;
}) {
  const open = sessions.filter(s => s.status === "open").length;
  const inProg = sessions.filter(s => s.status === "in_progress").length;
  const totalPlayers = sessions.reduce((a, s) => a + s.registrations.filter(r => r.status === "confirmed").length, 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>Chào mừng trở lại</p>
              <h1 className="text-[17px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Nguyễn Văn A · Chủ sân</h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[{ v: String(sessions.length), l: "Tổng buổi" }, { v: String(open + inProg), l: "Đang hoạt động" }, { v: String(totalPlayers), l: "Đã tham gia" }].map(s => (
            <div key={s.l} className="bg-[#f6f9f6] rounded-xl p-2.5 text-center">
              <p className="text-[#006e26] text-[20px] font-black" style={{ fontFamily: F }}>{s.v}</p>
              <p className="text-[#9aaa99] text-[10px]" style={{ fontFamily: F }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Buổi đánh giá</h2>
          <button onClick={onCreate} className="flex items-center gap-1.5 bg-[#006e26] text-white text-[12px] font-semibold px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,110,38,0.3)]" style={{ fontFamily: F }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1V11M1 6H11" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            Tạo mới
          </button>
        </div>

        {sessions.map(s => <SessionCard key={s.id} session={s} onTap={() => onSessionTap(s.id)} />)}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

export function SessionCard({ session: s, onTap }: { session: Session; onTap: () => void }) {
  const confirmed = s.registrations.filter(r => r.status === "confirmed").length;
  const pending = s.registrations.filter(r => r.status === "pending").length;
  return (
    <button onClick={onTap} className="bg-white rounded-2xl p-4 text-left border border-[#eef2ec] shadow-sm w-full active:bg-[#f9fbf9]">
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-[14px] font-semibold text-[#1a1a1a] flex-1 pr-2 leading-snug" style={{ fontFamily: F }}>{s.title}</h3>
        <StatusDot status={s.status} />
      </div>
      <p className="text-[12px] text-[#7a8a79] mb-0.5 font-medium" style={{ fontFamily: F }}>{s.venueName}</p>
      <p className="text-[12px] text-[#7a8a79] mb-3" style={{ fontFamily: F }}>
        {s.date.split("-").reverse().join("/")} · {s.time} · {s.approvalType === "auto" ? "Tự động duyệt" : "Duyệt thủ công"}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-1">
          {s.registrations.slice(0, 3).map((r, i) => (
            <img key={i} src={r.avatar} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
          ))}
        </div>
        <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>
          {confirmed} xác nhận{pending > 0 ? ` · ${pending} chờ duyệt` : ""}
        </span>
        <div className="flex-1" />
        <div className="h-1.5 w-20 bg-[#eef2ec] rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${(confirmed / s.maxParticipants) * 100}%`, background: G }} />
        </div>
        <span className="text-[10px] text-[#7a8a79]" style={{ fontFamily: F }}>{confirmed}/{s.maxParticipants}</span>
      </div>
    </button>
  );
}

// ─── EDIT SESSION ─────────────────────────────────────────────────────────────
export function EditSessionScreen({ session, onBack, onSave }: {
  session: Session;
  onBack: () => void;
  onSave: (patch: Partial<Session>) => void;
}) {
  const [title, setTitle] = useState(session.title);
  const [description, setDescription] = useState(session.description);
  const [time, setTime] = useState(session.time);
  const [maxParticipants, setMaxParticipants] = useState(String(session.maxParticipants));
  const [approvalType, setApprovalType] = useState<ApprovalType>(session.approvalType);
  const [scorerName, setScornerName] = useState(session.scorerName ?? "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({ title, description, time, maxParticipants: Number(maxParticipants) || session.maxParticipants, approvalType, scorerName });
    setSaved(true);
    setTimeout(() => onBack(), 900);
  };

  const changed = title !== session.title || description !== session.description ||
    time !== session.time || maxParticipants !== String(session.maxParticipants) ||
    approvalType !== session.approvalType || scorerName !== (session.scorerName ?? "");

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      {saved && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-[#006e26] text-white rounded-2xl px-4 py-3.5 flex items-center gap-2 shadow-xl">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[14px] font-semibold" style={{ fontFamily: F }}>Đã lưu thay đổi</span>
        </div>
      )}

      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Chỉnh sửa buổi</h1>
        <p className="text-[12px] font-semibold text-[#006e26] mt-0.5" style={{ fontFamily: F }}>{session.venueName}</p>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        {/* Read-only fields */}
        <div className="bg-[#f0f4f0] rounded-2xl px-4 py-3 flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold text-[#8e9c8d] uppercase tracking-wider" style={{ fontFamily: M }}>Không thể chỉnh sửa</p>
          <div className="flex flex-wrap gap-2 mt-0.5">
            {[
              { l: "Ngày", v: session.date.split("-").reverse().join("/") },
              { l: "Môn", v: session.sport },
              { l: "Lệ phí", v: formatFee(session.fee ?? 0) },
              { l: "Sân", v: session.venueName },
            ].map(f => (
              <div key={f.l} className="bg-white rounded-xl px-3 py-1.5">
                <span className="text-[10px] text-[#9aaa99]" style={{ fontFamily: F }}>{f.l}: </span>
                <span className="text-[12px] font-semibold text-[#5a6a59]" style={{ fontFamily: F }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>

        <IOSInput label="Tên buổi đánh giá" placeholder="Tên buổi" value={title} onChange={setTitle} />
        <IOSInput label="Người chấm điểm" placeholder="Tên người chấm" value={scorerName} onChange={setScornerName} />
        <IOSTextarea label="Mô tả" placeholder="Mô tả buổi đánh giá..." value={description} onChange={setDescription} />

        <div className="grid grid-cols-2 gap-3">
          <IOSInput label="Giờ bắt đầu" placeholder="08:00" type="time" value={time} onChange={setTime} />
          <IOSInput label="Số chỗ tối đa" placeholder="16" type="number" value={maxParticipants} onChange={setMaxParticipants} />
        </div>

        {/* Approval toggle */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Duyệt người tham gia</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { v: "auto" as ApprovalType, label: "Tự động duyệt", desc: "Vào ngay lập tức" },
              { v: "manual" as ApprovalType, label: "Duyệt thủ công", desc: "Chủ sân xét duyệt" },
            ]).map(opt => (
              <button key={opt.v} onClick={() => setApprovalType(opt.v)}
                className={`rounded-xl p-3 text-left border-2 transition-all ${approvalType === opt.v ? "border-[#006e26] bg-[#e8f5ee]" : "border-[#e5ebe4] bg-white"}`}>
                <p className={`text-[13px] font-semibold ${approvalType === opt.v ? "text-[#006e26]" : "text-[#1a1a1a]"}`} style={{ fontFamily: F }}>{opt.label}</p>
                <p className="text-[11px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <Btn onClick={handleSave} disabled={!title.trim() || !changed}>Lưu thay đổi</Btn>
        <Btn variant="ghost" onClick={onBack}>Hủy</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── SESSION DETAIL (OWNER) ───────────────────────────────────────────────────
export function SessionDetailOwner({ session, onBack, onScore, onApprove, onReject, onStart, onComplete, onRemoveParticipant, onCancelSession, onEdit }: {
  session: Session; onBack: () => void;
  onScore: (userId: string) => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onStart: () => void;
  onComplete: () => void;
  onRemoveParticipant: (userId: string) => void;
  onCancelSession: () => void;
  onEdit: () => void;
}) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const pending = session.registrations.filter(r => r.status === "pending");
  const confirmed = session.registrations.filter(r => r.status === "confirmed");
  const allScored = confirmed.length > 0 && confirmed.every(r => session.scores[r.userId]);
  const canEdit = canModifySession(session);
  const days = daysUntil(session.date);
  const canOwnerCancel = canEdit && confirmed.length < MIN_PARTICIPANTS && session.status === "open";

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        {/* Top row: back + action buttons */}
        <div className="flex items-center justify-between">
          <BackBtn onClick={onBack} />
          {session.status === "open" && (
            <div className="flex items-center gap-2">
              <button onClick={onEdit}
                className="text-[12px] font-semibold text-[#006e26] border border-[#c8ddc7] rounded-xl px-3 py-1.5 bg-[#f0faf4] active:bg-[#e2f5ea]"
                style={{ fontFamily: F }}>
                Chỉnh sửa
              </button>
              {canEdit ? (
                <button onClick={() => setConfirmCancel(true)}
                  className="text-[12px] font-semibold text-[#dc2626] border border-[#fca5a5] rounded-xl px-3 py-1.5 bg-[#fef2f2] active:bg-[#fee2e2]"
                  style={{ fontFamily: F }}>
                  Hủy sự kiện
                </button>
              ) : (
                <span className="text-[11px] text-[#9ca3af] px-2" style={{ fontFamily: F }}>
                  Đã qua hạn hủy
                </span>
              )}
            </div>
          )}
        </div>

        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-3 leading-snug" style={{ fontFamily: F }}>{session.title}</h1>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <StatusDot status={session.status} />
          <span className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>
            {session.date.split("-").reverse().join("/")} · {session.time}
          </span>
          <span className="text-[12px] font-semibold text-[#006e26]" style={{ fontFamily: F }}>· {session.venueName}</span>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {[
            session.sport,
            session.approvalType === "auto" ? "Tự động duyệt" : "Duyệt thủ công",
            (session.fee ?? 0) > 0 ? `Lệ phí: ${formatFee(session.fee)}` : "Miễn phí",
            session.scorerName ? `Chấm: ${session.scorerName}` : null,
          ].filter(Boolean).map(t => (
            <span key={t} className="text-[11px] bg-[#f0f4f0] text-[#5a6a59] font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: F }}>
              {t}
            </span>
          ))}
        </div>

        {session.description && (
          <p className="text-[13px] text-[#5a6a59] mt-2.5 leading-relaxed" style={{ fontFamily: F }}>{session.description}</p>
        )}
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Cancelled banner */}
        {session.status === "cancelled" && (
          <div className="bg-[#fee2e2] border border-[#fca5a5] rounded-2xl p-4 text-center">
            <p className="text-[#dc2626] font-semibold text-[14px]" style={{ fontFamily: F }}>Buổi đánh giá đã bị hủy</p>
          </div>
        )}

        {/* Deadline notice */}
        {session.status === "open" && (
          <div className={`rounded-xl px-4 py-2.5 text-[12px] font-medium ${canEdit ? "bg-[#e8f5ee] text-[#15803d]" : "bg-[#fee2e2] text-[#dc2626]"}`} style={{ fontFamily: F }}>
            {canEdit
              ? `Còn ${days} ngày — có thể chỉnh sửa danh sách tham gia`
              : `Đã qua thời hạn ${CANCEL_DAYS_BEFORE} ngày — không thể thay đổi danh sách`}
          </div>
        )}

        {/* Action buttons */}
        {session.status === "open" && confirmed.length >= MIN_PARTICIPANTS && canEdit && (
          <Btn onClick={onStart}>Bắt đầu buổi đánh giá</Btn>
        )}
        {session.status === "open" && confirmed.length >= MIN_PARTICIPANTS && !canEdit && (
          <Btn onClick={onStart}>Bắt đầu buổi đánh giá</Btn>
        )}
        {session.status === "in_progress" && allScored && (
          <Btn onClick={onComplete} variant="amber">Hoàn thành & xem kết quả</Btn>
        )}

        {/* Confirm cancel dialog (triggered from header button) */}
        {confirmCancel && (
          <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-[13px] font-semibold text-[#dc2626]" style={{ fontFamily: F }}>
              Xác nhận hủy buổi? Toàn bộ người đăng ký sẽ được thông báo.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmCancel(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#d8e6d7] text-[#1a1a1a] text-[13px] font-semibold bg-white"
                style={{ fontFamily: F }}>Không</button>
              <button onClick={() => { setConfirmCancel(false); onCancelSession(); }}
                className="flex-1 py-2.5 rounded-xl bg-[#dc2626] text-white text-[13px] font-semibold"
                style={{ fontFamily: F }}>Xác nhận hủy</button>
            </div>
          </div>
        )}

        {/* Pending approvals */}
        {pending.length > 0 && session.status !== "cancelled" && (
          <div>
            <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: F }}>Chờ duyệt ({pending.length})</h3>
            <div className="flex flex-col gap-2">
              {pending.map(r => (
                <div key={r.userId} className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-3 flex items-center gap-3">
                  <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{r.name}</p>
                    <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{r.level}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => onApprove(r.userId)} className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d] font-bold text-sm">✓</button>
                    <button onClick={() => onReject(r.userId)} className="w-8 h-8 rounded-full bg-[#fee2e2] flex items-center justify-center text-[#dc2626] font-bold text-sm">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed participants */}
        <div>
          <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: F }}>
            Người tham gia ({confirmed.length}/{session.maxParticipants})
            {confirmed.length < MIN_PARTICIPANTS && session.status === "open" && (
              <span className="ml-2 text-[11px] font-normal text-[#dc2626]">(cần tối thiểu {MIN_PARTICIPANTS} người)</span>
            )}
          </h3>

          {confirmed.length === 0 && (
            <p className="text-[13px] text-[#9ca3af] py-2" style={{ fontFamily: F }}>Chưa có người tham gia.</p>
          )}

          <div className="flex flex-col gap-2">
            {confirmed.map(r => {
              const scored = session.scores[r.userId];
              const ws = scored ? computeScore(scored, session.criteriaWeights) : null;
              const removing = confirmRemove === r.userId;
              return (
                <div key={r.userId}>
                  <div className="bg-white border border-[#eef2ec] rounded-2xl p-3 flex items-center gap-3">
                    <img src={r.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{r.name}</p>
                      <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{r.level}</p>
                    </div>
                    {session.status === "in_progress" ? (
                      <button onClick={() => onScore(r.userId)}
                        className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${scored ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#006e26] text-white"}`}
                        style={{ fontFamily: F }}>
                        {scored ? getSkillLevel(ws!, session.sport).label : "Chấm điểm"}
                      </button>
                    ) : ws !== null ? (
                      <span className="text-[13px] font-black px-2 py-0.5 rounded-lg"
                        style={{ fontFamily: M, color: getSkillLevel(ws, session.sport).color, background: getSkillLevel(ws, session.sport).bg }}>
                        {getSkillLevel(ws, session.sport).label}
                      </span>
                    ) : canEdit && session.status === "open" ? (
                      <button onClick={() => setConfirmRemove(r.userId)}
                        className="w-8 h-8 rounded-full bg-[#fee2e2] flex items-center justify-center"
                        title="Xóa người tham gia">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2L10 10M10 2L2 10" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                  {removing && (
                    <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-xl px-3 py-2.5 mt-1 flex items-center gap-2">
                      <p className="flex-1 text-[12px] text-[#dc2626]" style={{ fontFamily: F }}>Xóa {r.name} khỏi buổi?</p>
                      <button onClick={() => setConfirmRemove(null)}
                        className="text-[12px] text-[#5a6a59] font-medium px-2 py-1 bg-white rounded-lg border border-[#e5ebe4]"
                        style={{ fontFamily: F }}>Không</button>
                      <button onClick={() => { setConfirmRemove(null); onRemoveParticipant(r.userId); }}
                        className="text-[12px] text-white font-medium px-2 py-1 bg-[#dc2626] rounded-lg"
                        style={{ fontFamily: F }}>Xóa</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Criteria summary */}
        <div className="bg-white border border-[#eef2ec] rounded-2xl p-4">
          <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: F }}>Tiêu chí đánh giá</h3>
          {CRITERIA.map(c => (
            <div key={c.id} className="flex items-center gap-2 mb-2 last:mb-0">
              <span className="text-sm">{c.emoji}</span>
              <span className="flex-1 text-[12px] text-[#3a4a39]" style={{ fontFamily: F }}>{c.name}</span>
              <span className="text-[12px] font-bold" style={{ fontFamily: M, color: G }}>{session.criteriaWeights[c.id]}%</span>
            </div>
          ))}
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── SCORING ──────────────────────────────────────────────────────────────────
export function ScoringScreen({ session, userId, onBack, onSave }: {
  session: Session; userId: string;
  onBack: () => void; onSave: (scores: Record<string, number>) => void;
}) {
  const sport: Sport = session.sport ?? "Cầu lông";
  const player = session.registrations.find(r => r.userId === userId)!;
  const [scores, setScores] = useState<Record<string, number>>(
    session.scores[userId] ?? Object.fromEntries(CRITERIA.map(c => [c.id, 0]))
  );
  const ws = computeScore(scores, session.criteriaWeights);
  const allFilled = CRITERIA.every(c => scores[c.id] > 0);
  const lvl = getSkillLevel(ws, sport);
  const sportEmoji = sport === "Cầu lông" ? "🏸" : sport === "Tennis" ? "🎾" : "🏓";

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Chấm điểm</h1>
        <p className="text-[12px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>
          {sportEmoji} {sport}
        </p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Player info + live level */}
        <div className="flex items-center gap-4 rounded-2xl p-4 border-2" style={{ background: lvl.bg, borderColor: lvl.color + "40" }}>
          <img src={player.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" />
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{player.name}</p>
            <p className="text-[11px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{player.level}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[36px] font-black leading-none" style={{ fontFamily: M, color: lvl.color }}>
              {allFilled ? lvl.label : "—"}
            </span>
            <span className="text-[9px] font-semibold text-center leading-tight max-w-[64px]"
              style={{ color: lvl.color, fontFamily: F }}>
              {allFilled ? lvl.desc : "Chưa đủ tiêu chí"}
            </span>
          </div>
        </div>

        {/* Scale legend */}
        <div className="bg-white rounded-2xl px-4 py-3 border border-[#eef2ec]">
          <p className="text-[11px] font-semibold text-[#7a8a79] mb-2" style={{ fontFamily: M }}>
            THANG TRÌNH ĐỘ · {sport.toUpperCase()}
          </p>
          <div className="flex gap-1 flex-wrap">
            {(sport === "Cầu lông" ? BADMINTON_LEVELS : RACKET_LEVELS).map(l => (
              <span key={l.label}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{
                  background: allFilled && lvl.label === l.label ? l.bg : "transparent",
                  color: allFilled && lvl.label === l.label ? l.color : "#c0cdbf",
                  borderColor: allFilled && lvl.label === l.label ? l.color + "60" : "#e5ebe4",
                  fontFamily: M,
                }}>
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Score each criterion */}
        {CRITERIA.map(c => {
          const val = scores[c.id] ?? 0;
          return (
            <div key={c.id} className="bg-white rounded-2xl p-4 border border-[#eef2ec]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{c.emoji}</span>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{c.name}</p>
                  <p className="text-[10px] text-[#7a8a79]" style={{ fontFamily: F }}>{c.sub} · Trọng số {session.criteriaWeights[c.id]}%</p>
                </div>
                {val > 0 && <ScoreBadge score={val} />}
              </div>
              {/* 5-button score selector */}
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setScores(p => ({ ...p, [c.id]: n }))}
                    className={`flex flex-col items-center gap-0.5 py-2 rounded-xl border-2 transition-all ${val === n ? "border-transparent" : "border-[#eef2ec]"}`}
                    style={{ background: val === n ? SCORE_BG[n] : "transparent" }}>
                    <span className="text-[16px] font-black" style={{ fontFamily: M, color: val === n ? SCORE_COLORS[n] : "#c0cdbf" }}>{n}</span>
                    <span className="text-[8px] font-medium leading-tight text-center" style={{ fontFamily: F, color: val === n ? SCORE_COLORS[n] : "#b0b8b0" }}>{SCORE_LABELS[n]}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <Btn onClick={() => onSave(scores)} disabled={!allFilled}>Lưu điểm</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── SESSION RESULTS ──────────────────────────────────────────────────────────
export function SessionResultsScreen({ session, onBack }: { session: Session; onBack: () => void }) {
  const ranked = session.registrations
    .filter(r => r.status === "confirmed" && session.scores[r.userId])
    .map(r => ({ ...r, score: computeScore(session.scores[r.userId], session.criteriaWeights) }))
    .sort((a, b) => b.score - a.score);

  const medalEmoji = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Kết quả</h1>
        <p className="text-[13px] text-[#7a8a79]" style={{ fontFamily: F }}>
          {session.title}
        </p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {/* Podium top 3 */}
        {ranked.length >= 2 && (
          <div className="bg-gradient-to-br from-[#006e26] to-[#00521d] rounded-2xl p-5 flex items-end justify-center gap-5">
            {[ranked[1], ranked[0], ranked[2]].filter(Boolean).map((r, i) => {
              const pos = i === 1 ? 0 : i === 0 ? 1 : 2;
              const heights = [72, 88, 60];
              const lvl = getSkillLevel(r.score, session.sport);
              return (
                <div key={r.userId} className="flex flex-col items-center gap-1.5">
                  {pos < 3 && <span className="text-xl">{medalEmoji[pos]}</span>}
                  <img src={r.avatar} alt="" className={`rounded-full border-2 border-white/40 object-cover ${pos === 0 ? "w-14 h-14" : "w-11 h-11"}`} />
                  <div className="bg-white/15 rounded-t-lg w-full flex flex-col items-center justify-end pb-1.5 px-2" style={{ height: heights[i] }}>
                    <span className="text-white font-black text-[13px]" style={{ fontFamily: M }}>{lvl.label}</span>
                  </div>
                  <p className="text-white/80 text-[10px] text-center font-medium max-w-[54px] leading-tight" style={{ fontFamily: F }}>{r.name.split(" ").pop()}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Full list */}
        {ranked.map((r, idx) => {
          const lvl = getSkillLevel(r.score, session.sport);
          return (
            <div key={r.userId} className="bg-white border border-[#eef2ec] rounded-2xl p-3.5 flex items-center gap-3">
              <span className="w-6 text-[14px] font-black text-center text-[#7a8a79]" style={{ fontFamily: M }}>{idx + 1}</span>
              <img src={r.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{r.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {CRITERIA.map(c => (
                    <span key={c.id} className="text-[9px]" title={`${c.name}: ${SCORE_LABELS[session.scores[r.userId]?.[c.id] ?? 0]}`}>{c.emoji}</span>
                  ))}
                  <span className="text-[10px] text-[#b0b8b0]" style={{ fontFamily: F }}>
                    {CRITERIA.map(c => session.scores[r.userId]?.[c.id] ?? 0).join("-")}
                  </span>
                </div>
              </div>
              <span className="text-[18px] font-black px-2.5 py-1 rounded-xl"
                style={{ fontFamily: M, color: lvl.color, background: lvl.bg }}>
                {lvl.label}
              </span>
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

