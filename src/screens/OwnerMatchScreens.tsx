import { useState } from "react";
import type React from "react";
import {
  G, F, M, CRITERIA, SCORE_LABELS, SCORE_COLORS, SCORE_BG, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, EQUAL_WEIGHTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, scoreToPercent, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, ScoreBadge, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";

export function OwnerMatchesScreen({ matchmaking, onCreate, onTap }: {
  matchmaking: MatchmakingSession[];
  onCreate: () => void;
  onTap: (id: number) => void;
}) {
  const statusColor: Record<string, string> = { open: "#22c55e", matching: "#f59e0b", in_progress: "#f59e0b", completed: "#6b7280" };
  const statusLabel: Record<string, string> = { open: "Đang mở", matching: "Đang xếp trận", in_progress: "Đang thi đấu", completed: "Đã kết thúc" };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Buổi đấu ghép</h1>
          <button onClick={onCreate}
            className="flex items-center gap-1.5 bg-[#006e26] text-white text-[12px] font-semibold px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,110,38,0.3)]"
            style={{ fontFamily: F }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1V11M1 6H11" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            Tạo mới
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        {matchmaking.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center border border-[#eef2ec]">
            <p className="text-[14px] text-[#7a8a79]" style={{ fontFamily: F }}>Chưa có buổi đấu ghép nào</p>
          </div>
        )}
        {matchmaking.map(m => (
          <button key={m.id} onClick={() => onTap(m.id)}
            className="bg-white border border-[#eef2ec] rounded-2xl p-4 text-left w-full active:bg-[#f9fbf9]">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Đấu ghép {m.sport}</p>
                <p className="text-[12px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{m.date.split("-").reverse().join("/")} · {m.time}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[m.status] }} />
                <span className="text-[11px] font-medium text-[#7a8a79]" style={{ fontFamily: F }}>{statusLabel[m.status]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {m.registrations.slice(0, 4).map((r, i) => (
                  <img key={i} src={r.avatar} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{m.registrations.length}/{m.maxParticipants} người · {m.matches.length} trận</span>
            </div>
          </button>
        ))}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── OWNER CREATE MATCHMAKING ──────────────────────────────────────────────────
export function OwnerCreateMatchmakingScreen({ onBack, onSave }: {
  onBack: () => void;
  onSave: (m: Omit<MatchmakingSession, "id" | "registrations" | "matches">) => void;
}) {
  const [sport, setSport] = useState<Sport>("Cầu lông");
  const [format, setFormat] = useState<MatchFormat>("singles");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [max, setMax] = useState("8");
  const [numCourts, setNumCourts] = useState("2");
  const valid = date && time;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Tạo buổi đấu ghép</h1>
        <p className="text-[12px] font-semibold text-[#006e26] mt-0.5" style={{ fontFamily: F }}>{OWNER_VENUE}</p>
      </div>
      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Môn thể thao</p>
          <div className="grid grid-cols-3 gap-2">
            {(["Cầu lông", "Tennis", "Pickleball"] as Sport[]).map(s => (
              <button key={s} onClick={() => setSport(s)}
                className={`rounded-xl py-2.5 text-[13px] font-semibold border-2 transition-all ${sport === s ? "border-[#006e26] bg-[#e8f5ee] text-[#006e26]" : "border-[#e5ebe4] bg-white text-[#5a6a59]"}`}
                style={{ fontFamily: F }}>{s}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <IOSInput label="Ngày" placeholder="" type="date" value={date} onChange={setDate} />
          <IOSInput label="Giờ" placeholder="" type="time" value={time} onChange={setTime} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <IOSInput label="Số người tối đa" placeholder="8" type="number" value={max} onChange={setMax} />
          <IOSInput label="Số sân nội bộ" placeholder="2" type="number" value={numCourts} onChange={setNumCourts} />
        </div>

        {/* Court preview */}
        {Number(numCourts) > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Sân sử dụng</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(Number(numCourts), 8) }, (_, i) => (
                <span key={i} className="text-[12px] font-semibold bg-[#e8f5ee] text-[#006e26] border border-[#c8ddc7] px-3 py-1.5 rounded-xl" style={{ fontFamily: F }}>
                  Sân {i + 1}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Thể thức</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { v: "singles" as MatchFormat, label: "Đơn", desc: "1 vs 1 — xếp từng người" },
              { v: "doubles" as MatchFormat, label: "Đôi", desc: "2 vs 2 — xếp theo cặp" },
            ]).map(opt => (
              <button key={opt.v} onClick={() => setFormat(opt.v)}
                className={`rounded-xl p-3 text-left border-2 transition-all ${format === opt.v ? "border-[#006e26] bg-[#e8f5ee]" : "border-[#e5ebe4] bg-white"}`}>
                <p className={`text-[14px] font-bold ${format === opt.v ? "text-[#006e26]" : "text-[#1a1a1a]"}`} style={{ fontFamily: F }}>{opt.label}</p>
                <p className="text-[11px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <Btn onClick={() => onSave({ sport, format, date, time, venueName: OWNER_VENUE, ownerName: "Nguyễn Văn A", numCourts: Number(numCourts) || 2, maxParticipants: Number(max) || 8, status: "open" })} disabled={!valid}>
          Tạo buổi đấu ghép
        </Btn>
        <Btn variant="ghost" onClick={onBack}>Hủy</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── OWNER MATCHMAKING DETAIL ──────────────────────────────────────────────────
export function OwnerMatchmakingDetailScreen({ session, onBack, onArrange, onRecordResult }: {
  session: MatchmakingSession;
  onBack: () => void;
  onArrange: () => void;
  onRecordResult: (matchId: number, result: string, winner: "team1" | "team2") => void;
}) {
  const [resultInput, setResultInput] = useState<Record<number, { score: string; winner: string }>>({});

  const statusLabel: Record<string, string> = { open: "Đang mở", matching: "Đang xếp trận", in_progress: "Đang thi đấu", completed: "Đã kết thúc" };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Đấu ghép {session.sport}</h1>
        <p className="text-[12px] font-semibold text-[#006e26] mt-0.5" style={{ fontFamily: F }}>{session.venueName}</p>
        <p className="text-[12px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{statusLabel[session.status]} · {session.date.split("-").reverse().join("/")} · {session.time}</p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Arrange matches */}
        {session.status === "open" && session.registrations.length >= 2 && (
          <Btn onClick={onArrange}>Xếp trận từ danh sách đăng ký</Btn>
        )}

        {/* Match pairs */}
        {/* Court overview */}
        {session.matches.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: session.numCourts }, (_, i) => {
              const courtName = `Sân ${i + 1}`;
              const courtMatch = session.matches.find(m => m.court === courtName);
              return (
                <div key={i} className={`flex-1 min-w-[80px] rounded-xl px-3 py-2 text-center border ${courtMatch ? "border-[#006e26] bg-[#e8f5ee]" : "border-[#e5ebe4] bg-white"}`}>
                  <p className="text-[12px] font-bold" style={{ fontFamily: F, color: courtMatch ? G : "#9ca3af" }}>{courtName}</p>
                  {courtMatch ? (
                    <p className="text-[9px] text-[#5a8a6a] leading-tight mt-0.5" style={{ fontFamily: F }}>
                      {courtMatch.team1.map(p => p.name.split(" ").pop()).join("/")} vs {courtMatch.team2.map(p => p.name.split(" ").pop()).join("/")}
                    </p>
                  ) : <p className="text-[9px] text-[#c0cdbf]" style={{ fontFamily: F }}>Trống</p>}
                </div>
              );
            })}
          </div>
        )}

        {session.matches.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>Trận đấu ({session.matches.length})</p>
            <div className="flex flex-col gap-3">
              {session.matches.map(m => (
                <div key={m.id} className="bg-white border border-[#eef2ec] rounded-2xl p-4">
                  {/* Court badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold text-[#006e26] bg-[#e8f5ee] border border-[#c8ddc7] px-2.5 py-0.5 rounded-full" style={{ fontFamily: F }}>
                      {m.court}
                    </span>
                    {m.result && <span className="text-[11px] font-medium text-[#6b7280]" style={{ fontFamily: F }}>Đã kết thúc</span>}
                    {!m.result && session.status === "in_progress" && <span className="text-[11px] font-medium text-[#f59e0b]" style={{ fontFamily: F }}>Đang thi đấu</span>}
                  </div>
                  {/* Teams display */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 flex flex-col gap-1">
                      {m.team1.map(p => (
                        <div key={p.userId} className="flex items-center gap-1.5">
                          <img src={p.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                          <span className="text-[12px] font-medium text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{p.name.split(" ").pop()}</span>
                        </div>
                      ))}
                    </div>
                    {m.result ? (
                      <span className="text-[14px] font-black px-1" style={{ fontFamily: M, color: G }}>{m.result}</span>
                    ) : (
                      <span className="text-[14px] font-black text-[#c0cdbf] px-1" style={{ fontFamily: M }}>VS</span>
                    )}
                    <div className="flex-1 flex flex-col gap-1 items-end">
                      {m.team2.map(p => (
                        <div key={p.userId} className="flex items-center gap-1.5">
                          <span className="text-[12px] font-medium text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{p.name.split(" ").pop()}</span>
                          <img src={p.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {m.result ? (
                    <div className="bg-[#e8f5ee] rounded-xl px-3 py-2 text-center">
                      <span className="text-[12px] font-semibold text-[#15803d]" style={{ fontFamily: F }}>
                        Thắng: {m.winner === "team1" ? m.team1.map(p => p.name.split(" ").pop()).join(" & ") : m.team2.map(p => p.name.split(" ").pop()).join(" & ")}
                      </span>
                    </div>
                  ) : session.status === "in_progress" ? (
                    <div className="flex flex-col gap-2">
                      <input type="text" placeholder="Tỉ số (VD: 21-18)" value={resultInput[m.id]?.score ?? ""}
                        onChange={e => setResultInput(p => ({ ...p, [m.id]: { ...p[m.id], score: e.target.value } }))}
                        className="bg-[#f6f9f6] border border-[#e5ebe4] rounded-xl px-3 py-2.5 text-[14px] text-[#1a1a1a] placeholder-[#c0cdbf] outline-none w-full"
                        style={{ fontFamily: F }} />
                      <div className="grid grid-cols-2 gap-2">
                        {(["team1", "team2"] as const).map(t => (
                          <button key={t}
                            onClick={() => setResultInput(prev => ({ ...prev, [m.id]: { ...prev[m.id], winner: t } }))}
                            className={`py-2 rounded-xl text-[12px] font-semibold border-2 transition-all ${resultInput[m.id]?.winner === t ? "border-[#006e26] bg-[#e8f5ee] text-[#006e26]" : "border-[#e5ebe4] bg-white text-[#5a6a59]"}`}
                            style={{ fontFamily: F }}>
                            {(t === "team1" ? m.team1 : m.team2).map(p => p.name.split(" ").pop()).join("/")} thắng
                          </button>
                        ))}
                      </div>
                      <Btn small onClick={() => { const r = resultInput[m.id]; if (r?.score && r?.winner) onRecordResult(m.id, r.score, r.winner as "team1" | "team2"); }} disabled={!resultInput[m.id]?.score || !resultInput[m.id]?.winner}>
                        Lưu kết quả
                      </Btn>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registrations */}
        <div>
          <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>
            Đăng ký ({session.registrations.length}/{session.maxParticipants})
          </p>
          <div className="flex flex-col gap-2">
            {session.registrations.map(r => (
              <div key={r.userId} className="bg-white border border-[#eef2ec] rounded-xl px-3 py-2.5 flex items-center gap-3">
                <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{r.name}</p>
                  <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{r.level}{r.elo ? ` · ELO ${r.elo}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

