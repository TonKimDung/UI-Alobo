import { useState } from "react";
import type React from "react";
import {
  G, F, M, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, scoreToPercent, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";
import { formatFee } from "./PlayerSessionScreens";

export type CreateDraft = {
  title: string; description: string; date: string; time: string;
  sport: Sport; approvalType: ApprovalType; maxParticipants: string; fee: string;
  scorerName: string;
};


const ASSESSMENT_CRITERIA_GROUPS = [
  {
    title: "Kỹ thuật",
    weight: 30,
    desc: "Tổng hợp Forehand, Backhand, Serve và Volley/Net Play",
    items: [
      { id: "technical", name: "Kỹ thuật", sub: "Forehand, Backhand, Serve và Volley/Net Play", emoji: "", weight: 30 },
    ],
  },
  {
    title: "Kiểm soát bóng",
    weight: 20,
    desc: "Khả năng kiểm soát hướng bóng, độ sâu và độ chính xác",
    items: [
      { id: "ballControl", name: "Kiểm soát bóng", sub: "Kiểm soát hướng bóng, độ sâu và độ chính xác", emoji: "", weight: 20 },
    ],
  },
  {
    title: "Độ ổn định",
    weight: 10,
    desc: "Khả năng duy trì rally và hạn chế lỗi tự đánh hỏng",
    items: [
      { id: "consistency", name: "Độ ổn định", sub: "Duy trì rally và hạn chế lỗi tự đánh hỏng", emoji: "", weight: 10 },
    ],
  },
  {
    title: "Di chuyển",
    weight: 15,
    desc: "Footwork và khả năng trở về vị trí sau mỗi pha bóng",
    items: [
      { id: "movement", name: "Di chuyển", sub: "Footwork và khả năng trở về vị trí", emoji: "", weight: 15 },
    ],
  },
  {
    title: "Tư duy chiến thuật",
    weight: 10,
    desc: "Chọn cú đánh, đọc tình huống và thích nghi chiến thuật",
    items: [
      { id: "gameIQ", name: "Tư duy chiến thuật", sub: "Chọn cú đánh, đọc tình huống và thích nghi", emoji: "", weight: 10 },
    ],
  },
  {
    title: "Khả năng phán đoán",
    weight: 5,
    desc: "Dự đoán ý đồ đối thủ và chuẩn bị cho pha bóng tiếp theo",
    items: [
      { id: "anticipation", name: "Khả năng phán đoán", sub: "Dự đoán ý đồ đối thủ", emoji: "", weight: 5 },
    ],
  },
  {
    title: "Tâm lý thi đấu",
    weight: 5,
    desc: "Bình tĩnh và tự tin khi chịu áp lực",
    items: [
      { id: "mental", name: "Tâm lý thi đấu", sub: "Bình tĩnh và tự tin khi chịu áp lực", emoji: "", weight: 5 },
    ],
  },
  {
    title: "Thể lực",
    weight: 5,
    desc: "Khả năng duy trì cường độ thi đấu",
    items: [
      { id: "fitness", name: "Thể lực", sub: "Duy trì cường độ thi đấu", emoji: "", weight: 5 },
    ],
  },
];

const ASSESSMENT_CRITERIA = ASSESSMENT_CRITERIA_GROUPS.flatMap(g => g.items);
const DEFAULT_SKILL_WEIGHTS = Object.fromEntries(ASSESSMENT_CRITERIA.map(c => [c.id, c.weight]));

const SKILL_SCORE_LABELS: Record<number, string> = {
  1: "Rất yếu",
  2: "Yếu",
  3: "Cơ bản",
  4: "Tạm ổn",
  5: "Trung bình",
  6: "Khá",
  7: "Tốt",
  8: "Rất tốt",
  9: "Xuất sắc",
  10: "Vượt trội",
};

const skillScoreLabel = (score: number) => {
  if (!Number.isFinite(score) || score < 0) return "Chưa nhập";
  if (score >= 9) return "Xuất sắc";
  if (score >= 8) return "Rất tốt";
  if (score >= 7) return "Tốt";
  if (score >= 6) return "Khá";
  if (score >= 5) return "Trung bình";
  if (score >= 4) return "Tạm ổn";
  if (score >= 3) return "Cơ bản";
  if (score >= 2) return "Yếu";
  return "Rất yếu";
};

const skillScoreColor = (score: number) => {
  if (!Number.isFinite(score) || score < 0) return "#9ca3af";
  if (score >= 8) return "#006D38";
  if (score >= 6) return "#2f855a";
  if (score >= 4) return "#b7791f";
  return "#dc2626";
};

const skillScoreBg = (score: number) => {
  if (!Number.isFinite(score) || score < 0) return "#F7F7F7";
  if (score >= 8) return "#EBFAEE";
  if (score >= 6) return "#ecfdf5";
  if (score >= 4) return "#fffbeb";
  return "#fef2f2";
};

const normalizeSkillScoreInput = (raw: string) => {
  if (raw.trim() === "") return -1;
  const n = Number(raw);
  if (!Number.isFinite(n)) return -1;
  return Math.max(0, Math.min(10, Math.round(n * 10) / 10));
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
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="relative px-5 pt-12 pb-5" style={{ background: "#006D38" }}>
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
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#949494] px-1" style={{ fontFamily: M }}>Lệ phí (VNĐ)</p>
            <div className="relative bg-white rounded-xl border border-[#E0E0E5] focus-within:border-[#006D38] focus-within:ring-4 focus-within:ring-[#006D38]/10 flex items-center transition-colors">
              <input type="number" placeholder="0"
                value={draft.fee === "0" ? "" : draft.fee}
                onChange={e => setDraft(p => ({ ...p, fee: e.target.value || "0" }))}
                className="flex-1 bg-transparent px-4 py-3.5 text-[15px] text-[#1a1a1a] placeholder-[#BDBDC2] outline-none w-0"
                style={{ fontFamily: F }} />
              <span className="pr-3 text-[12px] text-[#9ca3af] flex-shrink-0" style={{ fontFamily: F }}>đ</span>
            </div>
            {draft.fee !== "0" && Number(draft.fee) > 0 ? (
              <p className="text-[11px] text-[#006D38] px-1" style={{ fontFamily: F }}>
                = {Number(draft.fee).toLocaleString("vi-VN")} VNĐ
              </p>
            ) : (
              <p className="text-[11px] text-[#9ca3af] px-1" style={{ fontFamily: F }}>Để trống = miễn phí</p>
            )}
          </div>
        </div>

        {/* Sport selector */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#949494] px-1" style={{ fontFamily: M }}>Môn thể thao</p>
          <div className="grid grid-cols-3 gap-2">
            {(["Cầu lông", "Tennis", "Pickleball"] as Sport[]).map(s => (
              <button key={s} onClick={() => setDraft(p => ({ ...p, sport: s }))}
                className={`rounded-xl py-2.5 text-[13px] font-semibold border-2 transition-all ${draft.sport === s ? "border-[#006D38] bg-[#EBFAEE] text-[#006D38]" : "border-[#E0E0E5] bg-white text-[#5A5A5F]"}`}
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
  const [weights, setWeights] = useState<Record<string, number>>(DEFAULT_SKILL_WEIGHTS);
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const isValid = total === 100;

  const setW = (id: string, val: number) => {
    setWeights(p => ({ ...p, [id]: Math.max(0, Math.min(100, val)) }));
  };

  const balance = () => setWeights(DEFAULT_SKILL_WEIGHTS);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="relative px-5 pt-12 pb-5" style={{ background: "#006D38" }}>
        <div className="relative z-10">
          <BackBtn onClick={onBack} light />
          <h1 className="text-white text-[20px] font-bold mt-3" style={{ fontFamily: F }}>Tiêu chí đánh giá</h1>
          <p className="text-white/70 text-[12px] mt-0.5" style={{ fontFamily: F }}>{draft.title}</p>
          <div className="flex items-center gap-2 mt-2">
            {["Thông tin cơ bản", "Tiêu chí đánh giá"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                {i > 0 && <div className="w-8 h-px bg-white/60" />}
                <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${i === 1 ? "bg-white text-[#006D38]" : "bg-white/40 text-white"}`} style={{ fontFamily: M }}>
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
          <span className="w-8 h-8 rounded-full bg-[#FFF6E3] flex items-center justify-center flex-shrink-0">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18H15M10 22H14M8.5 14.5C7.57 13.64 7 12.41 7 11A5 5 0 0 1 17 11C17 12.41 16.43 13.64 15.5 14.5C14.74 15.2 14.25 16.08 14.1 17H9.9C9.75 16.08 9.26 15.2 8.5 14.5Z" stroke="#F29100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <p className="text-[#92400e] text-[12px] font-semibold" style={{ fontFamily: F }}>Thang điểm 1–10</p>
            <p className="text-[#92400e] text-[11px] mt-0.5" style={{ fontFamily: F }}>
              1 là thấp nhất · 10 là cao nhất<br />
              Trọng số 8 tiêu chí phải tổng = 100%
            </p>
          </div>
        </div>

        {/* Total indicator */}
        <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
          <span className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Tổng trọng số</span>
          <div className="flex items-center gap-2">
            <span className={`text-[18px] font-black ${isValid ? "text-[#006D38]" : "text-[#dc2626]"}`} style={{ fontFamily: M }}>{total}</span>
            <button onClick={balance} className="text-[11px] bg-[#EBFAEE] text-[#006D38] font-semibold px-2 py-1 rounded-lg" style={{ fontFamily: F }}>Cân bằng</button>
          </div>
        </div>

        {/* Criteria weight sliders */}
        {ASSESSMENT_CRITERIA.map(c => (
          <div key={c.id} className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{c.emoji}</span>
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{c.name}</p>
                <p className="text-[10px] text-[#5A5A5F]" style={{ fontFamily: F }}>{c.sub}</p>
              </div>
              <div className="ml-auto w-12 h-8 rounded-xl flex items-center justify-center" style={{ background: isValid && weights[c.id] > 0 ? "#EBFAEE" : "#F7F7F7" }}>
                <span className="font-black text-[14px]" style={{ fontFamily: M, color: isValid && weights[c.id] > 0 ? G : "#9a9a9a" }}>
                  {weights[c.id]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setW(c.id, weights[c.id] - 5)} className="w-7 h-7 rounded-full bg-[#F7F7F7] text-[#6b7280] font-bold text-lg flex items-center justify-center">−</button>
              <input type="range" min={0} max={100} step={5} value={weights[c.id]} onChange={e => setW(c.id, Number(e.target.value))}
                className="flex-1 accent-[#006D38]" />
              <button onClick={() => setW(c.id, weights[c.id] + 5)} className="w-7 h-7 rounded-full bg-[#EBFAEE] text-[#006D38] font-bold text-lg flex items-center justify-center">+</button>
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
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#E0E0E5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <p className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>Chào mừng trở lại</p>
              <h1 className="text-[17px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Nguyễn Văn A · Chủ sân</h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[{ v: String(sessions.length), l: "Tổng buổi" }, { v: String(open + inProg), l: "Đang hoạt động" }, { v: String(totalPlayers), l: "Đã tham gia" }].map(s => (
            <div key={s.l} className="bg-[#EDEDED] rounded-xl p-2.5 text-center">
              <p className="text-[#006D38] text-[20px] font-black" style={{ fontFamily: F }}>{s.v}</p>
              <p className="text-[#949494] text-[10px]" style={{ fontFamily: F }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Buổi đánh giá</h2>
          <button onClick={onCreate} className="flex items-center gap-1.5 bg-[#006D38] text-white text-[12px] font-semibold px-3 py-1.5 rounded-xl shadow-[0_2px_8px_rgba(10,13,18,0.12)]" style={{ fontFamily: F }}>
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
    <button onClick={onTap} className="bg-white rounded-2xl p-4 text-left shadow-[0_2px_8px_rgba(10,13,18,0.06)] w-full transition-colors active:bg-[#F7F7F7]">
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-[14px] font-semibold text-[#1a1a1a] flex-1 pr-2 leading-snug" style={{ fontFamily: F }}>{s.title}</h3>
        <StatusDot status={s.status} />
      </div>
      <p className="text-[12px] text-[#5A5A5F] mb-0.5 font-medium" style={{ fontFamily: F }}>{s.venueName}</p>
      <p className="text-[12px] text-[#5A5A5F] mb-3" style={{ fontFamily: F }}>
        {s.date.split("-").reverse().join("/")} · {s.time} · {s.approvalType === "auto" ? "Tự động duyệt" : "Duyệt thủ công"}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-1">
          {s.registrations.slice(0, 3).map((r, i) => (
            <img key={i} src={r.avatar} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
          ))}
        </div>
        <span className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>
          {confirmed} xác nhận{pending > 0 ? ` · ${pending} chờ duyệt` : ""}
        </span>
        <div className="flex-1" />
        <div className="h-1.5 w-20 bg-[#E0E0E5] rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${(confirmed / s.maxParticipants) * 100}`, background: G }} />
        </div>
        <span className="text-[10px] text-[#5A5A5F]" style={{ fontFamily: F }}>{confirmed}/{s.maxParticipants}</span>
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
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      {saved && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-[#006D38] text-white rounded-2xl px-4 py-3.5 flex items-center gap-2 shadow-xl">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[14px] font-semibold" style={{ fontFamily: F }}>Đã lưu thay đổi</span>
        </div>
      )}

      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#E0E0E5]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Chỉnh sửa buổi</h1>
        <p className="text-[12px] font-semibold text-[#006D38] mt-0.5" style={{ fontFamily: F }}>{session.venueName}</p>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        {/* Read-only fields */}
        <div className="bg-[#F7F7F7] rounded-2xl px-4 py-3 flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold text-[#949494] uppercase tracking-wider" style={{ fontFamily: M }}>Không thể chỉnh sửa</p>
          <div className="flex flex-wrap gap-2 mt-0.5">
            {[
              { l: "Ngày", v: session.date.split("-").reverse().join("/") },
              { l: "Môn", v: session.sport },
              { l: "Lệ phí", v: formatFee(session.fee ?? 0) },
              { l: "Sân", v: session.venueName },
            ].map(f => (
              <div key={f.l} className="bg-white rounded-xl px-3 py-1.5">
                <span className="text-[10px] text-[#949494]" style={{ fontFamily: F }}>{f.l}: </span>
                <span className="text-[12px] font-semibold text-[#5A5A5F]" style={{ fontFamily: F }}>{f.v}</span>
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

        

        <Btn onClick={handleSave} disabled={!title.trim() || !changed}>Lưu thay đổi</Btn>
        <Btn variant="ghost" onClick={onBack}>Hủy</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

type OwnerAddedParticipant = Registration & {
  phone?: string;
  note?: string;
  isGuest?: boolean;
};

// ─── SESSION DETAIL (OWNER) ───────────────────────────────────────────────────
export function SessionDetailOwner({ session, onBack, onScore, onApprove, onReject, onStart, onComplete, onRemoveParticipant, onCancelSession, onEdit, onAddParticipant }: {
  session: Session; onBack: () => void;
  onScore: (userId: string) => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  onStart: () => void;
  onComplete: () => void;
  onRemoveParticipant: (userId: string) => void;
  onCancelSession: () => void;
  onEdit: () => void;
  onAddParticipant?: (participant: OwnerAddedParticipant) => void;
}) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [manualParticipants, setManualParticipants] = useState<OwnerAddedParticipant[]>([]);
  const [participantName, setParticipantName] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [participantLevel, setParticipantLevel] = useState("Chưa đánh giá");
  const [participantNote, setParticipantNote] = useState("");
  const [addParticipantError, setAddParticipantError] = useState("");

  const pending = session.registrations.filter(r => r.status === "pending");
  const confirmed = [
    ...session.registrations.filter(r => r.status === "confirmed"),
    ...manualParticipants,
  ] as OwnerAddedParticipant[];
  const allScored = confirmed.length > 0 && confirmed.every(r => session.scores[r.userId]);
  const canEdit = canModifySession(session);
  const days = daysUntil(session.date);
  const canOwnerCancel = canEdit && confirmed.length < MIN_PARTICIPANTS && session.status === "open";
  const levelOptions = session.sport === "Cầu lông"
    ? ["Chưa đánh giá", "D", "C", "C+", "B", "B+", "A", "A+", "Open"]
    : session.sport === "Tennis"
      ? ["Chưa đánh giá", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0+"]
      : ["Chưa đánh giá", "1.0", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5+", "6.0+"];

  const resetAddParticipantForm = () => {
    setParticipantName("");
    setParticipantPhone("");
    setParticipantLevel("Chưa đánh giá");
    setParticipantNote("");
    setAddParticipantError("");
  };

  const handleAddParticipant = () => {
    const name = participantName.trim();
    const phone = participantPhone.replace(/\s/g, "");

    if (!name) {
      setAddParticipantError("Vui lòng nhập họ và tên.");
      return;
    }
    if (!/^0\d{9}$/.test(phone)) {
      setAddParticipantError("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.");
      return;
    }
    if (confirmed.length >= session.maxParticipants) {
      setAddParticipantError("Buổi đánh giá đã đủ số lượng người tham gia.");
      return;
    }
    if (manualParticipants.some(p => p.phone === phone)) {
      setAddParticipantError("Số điện thoại này đã được thêm vào buổi đánh giá.");
      return;
    }

    const participant = {
      userId: `guest-${Date.now()}`,
      name,
      avatar: PLAYER_AVATARS[manualParticipants.length % PLAYER_AVATARS.length] ?? pAvatar1,
      level: participantLevel,
      status: "confirmed",
      phone,
      note: participantNote.trim(),
      isGuest: true,
    } as OwnerAddedParticipant;

    setManualParticipants(prev => [...prev, participant]);
    onAddParticipant?.(participant);
    setShowAddParticipant(false);
    resetAddParticipantForm();
  };

  return (
    <div className="relative flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#E0E0E5]">
        {/* Top row: back + action buttons */}
        <div className="flex items-center justify-between">
          <BackBtn onClick={onBack} />
          {session.status === "open" && (
            <div className="flex items-center gap-2">
              <button onClick={onEdit}
                className="text-[12px] font-semibold text-[#006D38] border border-[#B0D2C1] rounded-xl px-3 py-1.5 bg-[#EBFAEE] active:bg-[#E6F0EB]"
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
          <span className="text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>
            {session.date.split("-").reverse().join("/")} · {session.time}
          </span>
          <span className="text-[12px] font-semibold text-[#006D38]" style={{ fontFamily: F }}>· {session.venueName}</span>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {[
            session.sport,
            session.approvalType === "auto" ? "Tự động duyệt" : "Duyệt thủ công",
            (session.fee ?? 0) > 0 ? `Lệ phí: ${formatFee(session.fee)}` : "Miễn phí",
            session.scorerName ? `Chấm: ${session.scorerName}` : null,
          ].filter(Boolean).map(t => (
            <span key={t} className="text-[11px] bg-[#F7F7F7] text-[#5A5A5F] font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: F }}>
              {t}
            </span>
          ))}
        </div>

        {session.description && (
          <p className="text-[13px] text-[#5A5A5F] mt-2.5 leading-relaxed" style={{ fontFamily: F }}>{session.description}</p>
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
          <div className={`rounded-xl px-4 py-2.5 text-[12px] font-medium ${canEdit ? "bg-[#EBFAEE] text-[#15803d]" : "bg-[#fee2e2] text-[#dc2626]"}`} style={{ fontFamily: F }}>
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
                className="flex-1 py-2.5 rounded-xl border border-[#E0E0E5] text-[#1a1a1a] text-[13px] font-semibold bg-white"
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
                    <p className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>{r.level}</p>
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
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-[13px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>
              Người tham gia ({confirmed.length}/{session.maxParticipants})
              {confirmed.length < MIN_PARTICIPANTS && session.status === "open" && (
                <span className="ml-2 text-[11px] font-normal text-[#dc2626]">(cần tối thiểu {MIN_PARTICIPANTS} người)</span>
              )}
            </h3>
            {session.status === "open" && canEdit && confirmed.length < session.maxParticipants && (
              <button
                onClick={() => { resetAddParticipantForm(); setShowAddParticipant(true); }}
                className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold text-white bg-[#006D38] px-2.5 py-1.5 rounded-xl active:bg-[#004D28]"
                style={{ fontFamily: F }}
              >
                <span className="text-[14px] leading-none">＋</span>
                Thêm người
              </button>
            )}
          </div>

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
                  <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-3 flex items-center gap-3">
                    <img src={r.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{r.name}</p>
                      <p className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>{r.level}</p>
                      {r.isGuest && (
                        <>
                          <p className="text-[10px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>SĐT: {r.phone}</p>
                          {r.note && <p className="text-[10px] text-[#9ca3af] truncate" style={{ fontFamily: F }}>{r.note}</p>}
                          <span className="inline-flex mt-1 text-[9px] font-semibold text-[#92400e] bg-[#fffbeb] border border-[#fde68a] px-1.5 py-0.5 rounded-full" style={{ fontFamily: F }}>Khách vãng lai</span>
                        </>
                      )}
                    </div>
                    {session.status === "in_progress" ? (
                      <button onClick={() => onScore(r.userId)}
                        className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${scored ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#006D38] text-white"}`}
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
                        className="text-[12px] text-[#5A5A5F] font-medium px-2 py-1 bg-white rounded-lg border border-[#E0E0E5]"
                        style={{ fontFamily: F }}>Không</button>
                      <button onClick={() => {
                        setConfirmRemove(null);
                        if (r.isGuest) {
                          setManualParticipants(prev => prev.filter(p => p.userId !== r.userId));
                        } else {
                          onRemoveParticipant(r.userId);
                        }
                      }}
                        className="text-[12px] text-white font-medium px-2 py-1 bg-[#dc2626] rounded-lg"
                        style={{ fontFamily: F }}>Xóa</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showAddParticipant && (
          <div className="absolute inset-0 z-50 flex items-end bg-black/40 overflow-hidden" onClick={() => setShowAddParticipant(false)}>
            <div
              className="w-full max-h-[92%] overflow-y-auto bg-white rounded-t-[24px] p-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-[#E0E0E5] rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[17px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Thêm người tham gia</h3>
                  <p className="text-[11px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>Thêm thủ công vào buổi đánh giá</p>
                </div>
                <button onClick={() => setShowAddParticipant(false)} className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#6b7280] text-[18px]">×</button>
              </div>

              <div className="flex flex-col gap-3">
                <IOSInput label="Họ và tên *" placeholder="VD: Nguyễn Văn B" value={participantName} onChange={v => { setParticipantName(v); setAddParticipantError(""); }} />
                <IOSInput label="Số điện thoại *" placeholder="VD: 0901234567" type="tel" value={participantPhone} onChange={v => { setParticipantPhone(v.replace(/\D/g, "").slice(0, 10)); setAddParticipantError(""); }} />

                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#949494] px-1" style={{ fontFamily: M }}>Trình độ hiện tại</p>
                  <select
                    value={participantLevel}
                    onChange={e => setParticipantLevel(e.target.value)}
                    className="w-full bg-white rounded-xl border border-[#E0E0E5] px-4 py-3.5 text-[14px] text-[#1a1a1a] outline-none focus:border-[#006D38] focus:ring-4 focus:ring-[#006D38]/10"
                    style={{ fontFamily: F }}
                  >
                    {levelOptions.map(level => <option key={level} value={level}>{level}</option>)}
                  </select>
                </div>

                <IOSTextarea label="Ghi chú" placeholder="VD: Người chơi vãng lai, thành viên CLB..." value={participantNote} onChange={setParticipantNote} />

                {addParticipantError && (
                  <p className="text-[11px] font-medium text-[#dc2626] bg-[#fef2f2] border border-[#fecaca] rounded-xl px-3 py-2" style={{ fontFamily: F }}>
                    {addParticipantError}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => { setShowAddParticipant(false); resetAddParticipantForm(); }}
                    className="py-3 rounded-xl border border-[#E0E0E5] bg-white text-[#5A5A5F] text-[13px] font-semibold"
                    style={{ fontFamily: F }}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleAddParticipant}
                    className="py-3 rounded-xl bg-[#006D38] text-white text-[13px] font-semibold active:bg-[#004D28]"
                    style={{ fontFamily: F }}
                  >
                    Thêm người
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Criteria summary */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-4">
          <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: F }}>Tiêu chí đánh giá</h3>
          {ASSESSMENT_CRITERIA.map(c => (
            <div key={c.id} className="flex items-center gap-2 mb-2 last:mb-0">
              <span className="text-sm">{c.emoji}</span>
              <span className="flex-1 text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>{c.name}</span>
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
    session.scores[userId] ?? Object.fromEntries(ASSESSMENT_CRITERIA.map(c => [c.id, -1]))
  );
  const safeScores = Object.fromEntries(
    ASSESSMENT_CRITERIA.map(c => [c.id, Number.isFinite(scores[c.id]) && scores[c.id] >= 0 ? scores[c.id] : 0])
  ) as Record<string, number>;
  const ws = computeScore(safeScores, session.criteriaWeights);
  const allFilled = ASSESSMENT_CRITERIA.every(c => Number.isFinite(scores[c.id]) && scores[c.id] >= 0 && scores[c.id] <= 10);
  const lvl = getSkillLevel(ws, sport);
  const sportLabel = sport;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#E0E0E5]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Chấm điểm</h1>
        <p className="text-[12px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>
          {sportLabel}
        </p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Player info + live level */}
        <div className="flex items-center gap-4 rounded-2xl p-4 border-2" style={{ background: lvl.bg, borderColor: lvl.color + "40" }}>
          <img src={player.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" />
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{player.name}</p>
            <p className="text-[11px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>{player.level}</p>
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
        <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
          <p className="text-[11px] font-semibold text-[#5A5A5F] mb-2" style={{ fontFamily: M }}>
            THANG TRÌNH ĐỘ · {sport.toUpperCase()}
          </p>
          <div className="flex gap-1 flex-wrap">
            {(sport === "Cầu lông" ? BADMINTON_LEVELS : RACKET_LEVELS).map(l => (
              <span key={l.label}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{
                  background: allFilled && lvl.label === l.label ? l.bg : "transparent",
                  color: allFilled && lvl.label === l.label ? l.color : "#BDBDC2",
                  borderColor: allFilled && lvl.label === l.label ? l.color + "60" : "#E0E0E5",
                  fontFamily: M,
                }}>
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Score each criterion */}
        {ASSESSMENT_CRITERIA_GROUPS.map(group => (
          <div key={group.title} className="flex flex-col gap-2">
            <div className="px-1 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-black text-[#1a1a1a]" style={{ fontFamily: M }}>
                  {group.title}
                </p>
                <p className="text-[10px] text-[#5A5A5F]" style={{ fontFamily: F }}>
                  {group.desc}
                </p>
              </div>
            </div>

            {group.items.map(c => {
              const val = scores[c.id] ?? 0;
              return (
                <div key={c.id} className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{c.emoji}</span>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{c.name}</p>
                    </div>
                    {val > 0 && (
                      <span className="text-[11px] font-black px-2.5 py-1 rounded-xl"
                        style={{ fontFamily: M, color: skillScoreColor(val), background: skillScoreBg(val) }}>
                        {val}
                      </span>
                    )}
                  </div>
                  {/* Decimal score input */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#F7F7F7] rounded-2xl border border-[#E0E0E5] focus-within:border-[#006D38] focus-within:ring-4 focus-within:ring-[#006D38]/10 transition-colors px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          step={0.1}
                          inputMode="decimal"
                          placeholder="0.0"
                          value={val >= 0 ? String(val) : ""}
                          onChange={e => setScores(p => ({ ...p, [c.id]: normalizeSkillScoreInput(e.target.value) }))}
                          className="w-full bg-transparent outline-none text-[22px] font-black text-[#1a1a1a] placeholder-[#BDBDC2]"
                          style={{ fontFamily: M }}
                        />
                        <span className="text-[12px] font-semibold text-[#5A5A5F]" style={{ fontFamily: F }}>/10</span>
                      </div>
                      
                    </div>
                    <div className="w-[86px] rounded-2xl px-2 py-3 text-center" style={{ background: skillScoreBg(val) }}>
                      <p className="text-[18px] font-black leading-none" style={{ fontFamily: M, color: skillScoreColor(val) }}>
                        {val >= 0 ? val : "—"}
                      </p>
                      <p className="text-[9px] font-semibold mt-1 leading-tight" style={{ fontFamily: F, color: skillScoreColor(val) }}>
                        {skillScoreLabel(val)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <Btn onClick={() => onSave(safeScores)} disabled={!allFilled}>Lưu điểm</Btn>
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

  const medalLabel = ["1", "2", "3"];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#E0E0E5]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Kết quả</h1>
        <p className="text-[13px] text-[#5A5A5F]" style={{ fontFamily: F }}>
          {session.title}
        </p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {/* Podium top 3 */}
        {ranked.length >= 2 && (
          <div className="bg-gradient-to-br from-[#006D38] to-[#004D28] rounded-2xl p-5 flex items-end justify-center gap-5">
            {[ranked[1], ranked[0], ranked[2]].filter(Boolean).map((r, i) => {
              const pos = i === 1 ? 0 : i === 0 ? 1 : 2;
              const heights = [72, 88, 60];
              const lvl = getSkillLevel(r.score, session.sport);
              return (
                <div key={r.userId} className="flex flex-col items-center gap-1.5">
                  {pos < 3 && (
                    <span className="w-6 h-6 rounded-full bg-white text-[#006D38] text-[11px] font-bold flex items-center justify-center" style={{ fontFamily: M }}>
                      {medalLabel[pos]}
                    </span>
                  )}
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
            <div key={r.userId} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-3.5 flex items-center gap-3">
              <span className="w-6 text-[14px] font-black text-center text-[#5A5A5F]" style={{ fontFamily: M }}>{idx + 1}</span>
              <img src={r.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{r.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {ASSESSMENT_CRITERIA.map(c => (
                    <span key={c.id} className="text-[9px]" title={`${c.name}: ${session.scores[r.userId]?.[c.id] ?? 0}/10`}>{c.emoji}</span>
                  ))}
                  <span className="text-[10px] text-[#949494]" style={{ fontFamily: F }}>
                    {ASSESSMENT_CRITERIA.map(c => session.scores[r.userId]?.[c.id] ?? 0).join("-")}
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