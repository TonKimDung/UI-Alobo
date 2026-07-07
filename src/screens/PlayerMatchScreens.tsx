import { useState } from "react";
import type React from "react";
import {
  G, F, M, CRITERIA, SCORE_LABELS, SCORE_COLORS, SCORE_BG, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, EQUAL_WEIGHTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, scoreToPercent, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, ScoreBadge, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";

export function PlayerMatchesScreen({ challenges, matchmaking, onCreateChallenge, onJoinMatchmaking, onChallengeTap, onMatchmakingTap }: {
  challenges: ChallengeMatch[];
  matchmaking: MatchmakingSession[];
  onCreateChallenge: () => void;
  onJoinMatchmaking: () => void;
  onChallengeTap: (id: number) => void;
  onMatchmakingTap: (id: number) => void;
}) {
  const myChallenge = challenges.filter(c => c.creatorId === PLAYER_ID || c.inviteeId === PLAYER_ID);
  const invited = myChallenge.filter(c => c.inviteeId === PLAYER_ID && c.status === "invited");
  const myMatchmaking = matchmaking.filter(m => m.registrations.some(r => r.userId === PLAYER_ID));

  const challengeStatusStyle = (c: ChallengeMatch) => {
    if (c.status === "invited" && c.inviteeId === PLAYER_ID) return "bg-[#fef3c7] text-[#92400e]";
    if (c.status === "confirmed") return "bg-[#dcfce7] text-[#15803d]";
    if (c.status === "completed") return "bg-[#f3f4f6] text-[#6b7280]";
    return "bg-[#fef3c7] text-[#92400e]";
  };
  const challengeStatusLabel = (c: ChallengeMatch) => {
    if (c.status === "invited" && c.inviteeId === PLAYER_ID) return "Chờ xác nhận";
    if (c.status === "invited") return "Đã gửi lời mời";
    if (c.status === "confirmed") return "Đã xác nhận";
    if (c.status === "declined") return "Đã từ chối";
    return "Hoàn thành";
  };
  const mmStatusColor: Record<string, string> = { open: "#22c55e", matching: "#f59e0b", in_progress: "#f59e0b", completed: "#6b7280" };
  const mmStatusLabel: Record<string, string> = { open: "Đang mở", matching: "Đang xếp trận", in_progress: "Đang thi đấu", completed: "Đã kết thúc" };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <h1 className="text-[22px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Thi đấu</h1>
        {invited.length > 0 && (
          <div className="mt-2 bg-[#fef3c7] border border-[#fde68a] rounded-xl px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d97706]" />
            <p className="text-[12px] font-semibold text-[#92400e]" style={{ fontFamily: F }}>Bạn có {invited.length} lời mời chờ phản hồi</p>
          </div>
        )}
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-5">
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCreateChallenge}
            className="bg-[#006e26] rounded-2xl p-4 flex flex-col items-start gap-2 active:opacity-90 shadow-[0_4px_14px_rgba(0,110,38,0.25)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.8"/>
              <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-white font-bold text-[14px]" style={{ fontFamily: F }}>Tạo trận so tài</p>
              <p className="text-white/70 text-[11px] mt-0.5" style={{ fontFamily: F }}>Mời bạn đấu trực tiếp</p>
            </div>
          </button>
          <button onClick={onJoinMatchmaking}
            className="bg-white border-2 border-[#006e26] rounded-2xl p-4 flex flex-col items-start gap-2 active:bg-[#f0faf4]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#006e26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p className="text-[#006e26] font-bold text-[14px]" style={{ fontFamily: F }}>Đấu ghép</p>
              <p className="text-[#5a8a6a] text-[11px] mt-0.5" style={{ fontFamily: F }}>Hệ thống xếp đối thủ</p>
            </div>
          </button>
        </div>

        {/* Challenge matches */}
        {myChallenge.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>Trận so tài ({myChallenge.length})</p>
            <div className="flex flex-col gap-2">
              {myChallenge.map(c => (
                <button key={c.id} onClick={() => onChallengeTap(c.id)}
                  className="bg-white border border-[#eef2ec] rounded-2xl p-3.5 flex items-center gap-3 text-left w-full active:bg-[#f9fbf9]">
                  <div className="flex -space-x-2">
                    <img src={c.creatorAvatar} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    <img src={c.inviteeAvatar} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: F }}>
                      {c.creatorId === PLAYER_ID ? `vs ${c.inviteeName}` : `${c.creatorName} mời bạn`}
                    </p>
                    <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>
                      {c.sport} · {c.date.split("-").reverse().join("/")} · {c.time}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${challengeStatusStyle(c)}`} style={{ fontFamily: M }}>
                    {challengeStatusLabel(c)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Matchmaking */}
        {myMatchmaking.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>Đấu ghép đã đăng ký ({myMatchmaking.length})</p>
            <div className="flex flex-col gap-2">
              {myMatchmaking.map(m => (
                <button key={m.id} onClick={() => onMatchmakingTap(m.id)}
                  className="bg-white border border-[#eef2ec] rounded-2xl p-3.5 flex items-center gap-3 text-left w-full active:bg-[#f9fbf9]">
                  <div className="w-10 h-10 rounded-2xl bg-[#e8f5ee] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{m.sport === "Cầu lông" ? "🏸" : m.sport === "Tennis" ? "🎾" : "🏓"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Đấu ghép {m.sport} · {m.format === "doubles" ? "Đôi" : "Đơn"}</p>
                    <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{m.date.split("-").reverse().join("/")} · {m.time} · {m.venueName}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: mmStatusColor[m.status] }} />
                  <span className="text-[10px] font-medium text-[#7a8a79]" style={{ fontFamily: F }}>{mmStatusLabel[m.status]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {myChallenge.length === 0 && myMatchmaking.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center border border-[#eef2ec]">
            <p className="text-[14px] text-[#7a8a79]" style={{ fontFamily: F }}>Chưa có trận đấu nào</p>
            <p className="text-[12px] text-[#b0b8b0] mt-1" style={{ fontFamily: F }}>Tạo trận so tài hoặc đăng ký đấu ghép</p>
          </div>
        )}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── PLAYER CREATE CHALLENGE ───────────────────────────────────────────────────
const MOCK_PLAYERS = [
  { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao" },
  { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3, level: "Trung cấp" },
  { userId: "u4", name: "Nguyễn Thu Hà", avatar: pAvatar4, level: "Nâng cao" },
];

export function PlayerCreateChallengeScreen({ onBack, onSubmit }: {
  onBack: () => void;
  onSubmit: (c: Omit<ChallengeMatch, "id" | "status">) => void;
}) {
  const [sport, setSport] = useState<Sport>("Cầu lông");
  const [format, setFormat] = useState<MatchFormat>("singles");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [invitee, setInvitee] = useState<typeof MOCK_PLAYERS[0] | null>(null);
  const [step, setStep] = useState<"info" | "invite">("info");

  const valid = date && time;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={step === "invite" ? () => setStep("info") : onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Tạo trận so tài</h1>
        {/* Step dots */}
        <div className="flex items-center gap-2 mt-2">
          {["Đặt sân & thời gian", "Mời người chơi"].map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              {i > 0 && <div className="w-6 h-px bg-[#e5ebe4]" />}
              <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${(step === "info" && i === 0) || (step === "invite" && i === 1) ? "bg-[#006e26] text-white" : (step === "invite" && i === 0) ? "bg-[#dcfce7] text-[#006e26]" : "bg-[#f0f4f0] text-[#9aaa99]"}`} style={{ fontFamily: M }}>
                {step === "invite" && i === 0 ? "✓" : i + 1}
              </div>
              <span className="text-[11px] font-medium text-[#7a8a79]" style={{ fontFamily: F }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        {step === "info" ? (
          <>
            {/* Venue display */}
            <div className="bg-[#e8f5ee] rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#006e26] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/></svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#006e26]" style={{ fontFamily: F }}>{OWNER_VENUE}</p>
                <p className="text-[11px] text-[#5a8a6a]" style={{ fontFamily: F }}>Sân đã đặt trước từ tài khoản của bạn</p>
              </div>
            </div>

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

            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>Thể thức</p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { v: "singles" as MatchFormat, label: "Đơn", desc: "1 vs 1" },
                  { v: "doubles" as MatchFormat, label: "Đôi", desc: "2 vs 2" },
                ]).map(opt => (
                  <button key={opt.v} onClick={() => setFormat(opt.v)}
                    className={`rounded-xl p-3 text-left border-2 transition-all ${format === opt.v ? "border-[#006e26] bg-[#e8f5ee]" : "border-[#e5ebe4] bg-white"}`}>
                    <p className={`text-[14px] font-bold ${format === opt.v ? "text-[#006e26]" : "text-[#1a1a1a]"}`} style={{ fontFamily: F }}>{opt.label}</p>
                    <p className="text-[11px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <IOSInput label="Ngày" placeholder="" type="date" value={date} onChange={setDate} />
              <IOSInput label="Giờ" placeholder="" type="time" value={time} onChange={setTime} />
            </div>

            <Btn onClick={() => setStep("invite")} disabled={!valid}>Tiếp theo — Mời người chơi</Btn>
            <Btn variant="ghost" onClick={onBack}>Hủy</Btn>
          </>
        ) : (
          <>
            <p className="text-[13px] text-[#5a6a59]" style={{ fontFamily: F }}>
              Chọn người chơi mời tham gia · {sport} {format === "singles" ? "Đơn" : "Đôi"} · {date.split("-").reverse().join("/")} · {time}
            </p>

            <div className="flex flex-col gap-2">
              {MOCK_PLAYERS.map(p => (
                <button key={p.userId} onClick={() => setInvitee(invitee?.userId === p.userId ? null : p)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${invitee?.userId === p.userId ? "border-[#006e26] bg-[#e8f5ee]" : "border-[#eef2ec] bg-white"}`}>
                  <img src={p.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1 text-left">
                    <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{p.name}</p>
                    <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{p.level}</p>
                  </div>
                  {invitee?.userId === p.userId && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="#006e26"/>
                      <path d="M5 9L7.5 11.5L13 6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <Btn onClick={() => invitee && onSubmit({ sport, format, date, time, venueName: OWNER_VENUE, courtBooked: true, creatorId: PLAYER_ID, creatorName: PLAYER_NAME, creatorAvatar: PLAYER_AVATAR, inviteeId: invitee.userId, inviteeName: invitee.name, inviteeAvatar: invitee.avatar })} disabled={!invitee}>
              Gửi lời mời thi đấu
            </Btn>
          </>
        )}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── PLAYER CHALLENGE DETAIL ───────────────────────────────────────────────────
export function PlayerChallengeDetailScreen({ match, onBack, onAccept, onDecline }: {
  match: ChallengeMatch; onBack: () => void; onAccept: () => void; onDecline: () => void;
}) {
  const isInvited = match.inviteeId === PLAYER_ID && match.status === "invited";
  const isCreator = match.creatorId === PLAYER_ID;

  const statusBg: Record<ChallengeStatus, string> = { invited: "#fef3c7", confirmed: "#dcfce7", declined: "#fee2e2", completed: "#f3f4f6" };
  const statusText: Record<ChallengeStatus, string> = { invited: "Chờ xác nhận", confirmed: "Đã xác nhận", declined: "Đã từ chối", completed: "Đã kết thúc" };
  const statusColor: Record<ChallengeStatus, string> = { invited: "#92400e", confirmed: "#15803d", declined: "#dc2626", completed: "#6b7280" };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Trận so tài</h1>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Status banner */}
        <div className="rounded-2xl px-4 py-3 flex items-center gap-2" style={{ background: statusBg[match.status] }}>
          <div className="w-2 h-2 rounded-full" style={{ background: statusColor[match.status] }} />
          <span className="text-[13px] font-semibold" style={{ fontFamily: F, color: statusColor[match.status] }}>
            {isInvited ? `${match.creatorName} mời bạn tham gia` : statusText[match.status]}
          </span>
        </div>

        {/* Match info */}
        <div className="bg-white border border-[#eef2ec] rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#8e9c8d] uppercase tracking-wider" style={{ fontFamily: M }}>Thông tin trận</span>
            <span className="text-[13px] font-bold text-[#006e26]" style={{ fontFamily: F }}>{match.sport}</span>
          </div>
          {[
            { l: "Ngày", v: match.date.split("-").reverse().join("/") },
            { l: "Giờ", v: match.time },
            { l: "Sân", v: match.venueName },
            { l: "Đặt sân", v: match.courtBooked ? "Đã đặt sân" : "Chưa đặt sân" },
          ].map(row => (
            <div key={row.l} className="flex items-center justify-between border-t border-[#f3f7f3] pt-2">
              <span className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>{row.l}</span>
              <span className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{row.v}</span>
            </div>
          ))}
        </div>

        {/* Players */}
        <div className="bg-white border border-[#eef2ec] rounded-2xl p-4">
          <p className="text-[11px] font-semibold text-[#8e9c8d] uppercase tracking-wider mb-3" style={{ fontFamily: M }}>Người chơi</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <img src={match.creatorAvatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-[#e8f5ee]" />
              <p className="text-[12px] font-semibold text-[#1a1a1a] text-center" style={{ fontFamily: F }}>{match.creatorName}</p>
              {isCreator && <span className="text-[9px] bg-[#e8f5ee] text-[#006e26] font-bold px-1.5 py-0.5 rounded-full" style={{ fontFamily: F }}>Bạn</span>}
            </div>
            <span className="text-[20px] font-black text-[#c0cdbf]" style={{ fontFamily: M }}>VS</span>
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <img src={match.inviteeAvatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-[#eef2ec]" />
              <p className="text-[12px] font-semibold text-[#1a1a1a] text-center" style={{ fontFamily: F }}>{match.inviteeName}</p>
              {!isCreator && <span className="text-[9px] bg-[#e8f5ee] text-[#006e26] font-bold px-1.5 py-0.5 rounded-full" style={{ fontFamily: F }}>Bạn</span>}
            </div>
          </div>

          {/* Result */}
          {match.result && (
            <div className="mt-3 pt-3 border-t border-[#f3f7f3] text-center">
              <p className="text-[11px] text-[#7a8a79] mb-1" style={{ fontFamily: F }}>Kết quả</p>
              <p className="text-[24px] font-black" style={{ fontFamily: M, color: G }}>
                {match.result.creatorScore} – {match.result.inviteeScore}
              </p>
            </div>
          )}
        </div>

        {/* Accept / Decline */}
        {isInvited && (
          <>
            <Btn onClick={onAccept}>Chấp nhận lời mời</Btn>
            <Btn variant="danger" onClick={onDecline}>Từ chối</Btn>
          </>
        )}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── PLAYER JOIN MATCHMAKING ───────────────────────────────────────────────────
export function PlayerJoinMatchmakingScreen({ matchmaking, onBack, onJoin }: {
  matchmaking: MatchmakingSession[];
  onBack: () => void;
  onJoin: (sessionId: number) => void;
}) {
  const openSessions = matchmaking.filter(m => m.status === "open");
  const mmStatusLabel: Record<string, string> = { open: "Đang mở", matching: "Đang xếp trận", in_progress: "Đang thi đấu", completed: "Đã kết thúc" };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Đăng ký đấu ghép</h1>
        <p className="text-[13px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>Hệ thống xếp trận theo trình độ</p>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        <div className="bg-[#e8f5ee] border border-[#bbf0cc] rounded-2xl p-3.5 flex gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#006e26" strokeWidth="1.8"/>
            <path d="M12 16V12M12 8H12.01" stroke="#006e26" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-[12px] text-[#15803d] leading-relaxed" style={{ fontFamily: F }}>
            Sau khi đăng ký, chủ sân sẽ xếp trận dựa trên trình độ ELO của bạn. Bạn sẽ nhận thông báo khi trận đấu được sắp xếp xong.
          </p>
        </div>

        {openSessions.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-[#eef2ec]">
            <p className="text-[14px] text-[#7a8a79]" style={{ fontFamily: F }}>Chưa có buổi đấu ghép nào đang mở</p>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider" style={{ fontFamily: M }}>Buổi đấu ghép đang mở</p>
            {openSessions.map(m => {
              const alreadyIn = m.registrations.some(r => r.userId === PLAYER_ID);
              return (
                <div key={m.id} className="bg-white border border-[#eef2ec] rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Đấu ghép {m.sport} · {m.format === "doubles" ? "Đôi" : "Đơn"}</p>
                      <p className="text-[12px] font-semibold text-[#006e26]" style={{ fontFamily: F }}>{m.venueName}</p>
                      <p className="text-[11px] text-[#7a8a79] mt-0.5" style={{ fontFamily: F }}>{m.date.split("-").reverse().join("/")} · {m.time}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full" style={{ fontFamily: M }}>{mmStatusLabel[m.status]}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-1">
                      {m.registrations.slice(0, 4).map((r, i) => (
                        <img key={i} src={r.avatar} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{m.registrations.length}/{m.maxParticipants} người</span>
                  </div>
                  {alreadyIn ? (
                    <div className="bg-[#dcfce7] rounded-xl px-4 py-2 text-center">
                      <span className="text-[12px] font-semibold text-[#15803d]" style={{ fontFamily: F }}>Đã đăng ký</span>
                    </div>
                  ) : (
                    <Btn onClick={() => onJoin(m.id)}>Đăng ký tham gia</Btn>
                  )}
                </div>
              );
            })}
          </>
        )}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── PLAYER MATCHMAKING DETAIL ─────────────────────────────────────────────────
export function PlayerMatchmakingDetailScreen({ session, onBack }: { session: MatchmakingSession; onBack: () => void }) {
  const [showOpponentProfile, setShowOpponentProfile] = useState<string | false>(false);

  const myMatch = session.matches.find(m =>
    m.team1.some(p => p.userId === PLAYER_ID) || m.team2.some(p => p.userId === PLAYER_ID)
  );
  const myTeamKey = myMatch
    ? (myMatch.team1.some(p => p.userId === PLAYER_ID) ? "team1" : "team2")
    : null;
  const myTeam = myMatch && myTeamKey ? myMatch[myTeamKey] : [];
  const opponentTeam = myMatch && myTeamKey ? myMatch[myTeamKey === "team1" ? "team2" : "team1"] : [];
  // For singles, pick the solo opponent; for doubles pick all
  const opponentRegs = opponentTeam.map(p => session.registrations.find(r => r.userId === p.userId)).filter(Boolean);
  const myReg = session.registrations.find(r => r.userId === PLAYER_ID);
  const isDoubles = session.format === "doubles";

  const statusLabel: Record<string, string> = { open: "Đang mở", matching: "Đang xếp trận", in_progress: "Đang thi đấu", completed: "Đã kết thúc" };
  const statusColor: Record<string, string> = { open: "#22c55e", matching: "#f59e0b", in_progress: "#f59e0b", completed: "#6b7280" };

  // Derive opponent's skill level from their ELO (mock mapping)
  const eloToLevel = (elo: number) => {
    if (elo >= 1800) return "Nâng cao";
    if (elo >= 1500) return "Khá";
    if (elo >= 1200) return "Trung cấp";
    return "Mới bắt đầu";
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Đấu ghép {session.sport}</h1>
        <p className="text-[12px] font-semibold text-[#006e26] mt-0.5" style={{ fontFamily: F }}>{session.venueName}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full" style={{ background: statusColor[session.status] }} />
          <span className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>
            {statusLabel[session.status]} · {session.date.split("-").reverse().join("/")} · {session.time}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">

        {/* ── State: waiting for matchmaking ── */}
        {session.status === "open" && (
          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d97706" strokeWidth="1.8"/>
                <path d="M12 6V12L16 14" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#92400e]" style={{ fontFamily: F }}>Đang chờ xếp trận</p>
              <p className="text-[12px] text-[#92400e]/70 mt-1 leading-relaxed" style={{ fontFamily: F }}>
                Chủ sân sẽ xếp trận dựa trên trình độ của bạn và những người tham gia khác. Bạn sẽ nhận thông báo khi trận được sắp xếp.
              </p>
            </div>
            <div className="bg-white border border-[#fde68a] rounded-xl px-4 py-2 text-left w-full">
              <p className="text-[11px] text-[#92400e] font-semibold" style={{ fontFamily: F }}>
                Trình độ của bạn: <span style={{ fontFamily: M }}>{myReg?.level ?? "Khá"}</span>
                {myReg?.elo ? <span className="ml-2 opacity-70">· ELO {myReg.elo}</span> : null}
              </p>
            </div>
          </div>
        )}

        {/* ── State: match assigned ── */}
        {(session.status === "in_progress" || session.status === "completed") && myMatch && (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider" style={{ fontFamily: M }}>Trận đấu của bạn</p>

            {/* Court + VS card */}
            <div className="bg-[#006e26] rounded-2xl overflow-hidden">
              {/* Court + format badge */}
              <div className="flex items-center justify-center gap-2 px-4 pt-4 pb-2">
                <div className="bg-white/20 rounded-xl px-4 py-1.5 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.8"/>
                    <path d="M12 3V21M3 12H21" stroke="white" strokeWidth="1.5"/>
                    <path d="M3 7H21M3 17H21" stroke="white" strokeWidth="1" strokeDasharray="2 2"/>
                  </svg>
                  <span className="text-white font-bold text-[14px]" style={{ fontFamily: F }}>{myMatch.court}</span>
                </div>
                <div className="bg-white/15 rounded-xl px-3 py-1.5">
                  <span className="text-white/80 text-[12px] font-semibold" style={{ fontFamily: F }}>
                    {isDoubles ? "Đôi" : "Đơn"}
                  </span>
                </div>
              </div>

              {/* Teams */}
              <div className="px-4 pb-4 flex items-center gap-3">
                {/* My team */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className={`flex ${isDoubles ? "-space-x-2" : ""}`}>
                    {myTeam.map((p, i) => (
                      <div key={p.userId} className="relative">
                        <img src={p.avatar} alt="" className={`${isDoubles ? "w-12 h-12" : "w-16 h-16"} rounded-2xl border-2 border-white/30 object-cover`} />
                        {p.userId === PLAYER_ID && (
                          <span className="absolute -bottom-1 -right-1 text-[8px] bg-[#dcfce7] text-[#15803d] font-bold px-1 py-0.5 rounded-full border border-white" style={{ fontFamily: F }}>Bạn</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    {myTeam.map(p => (
                      <p key={p.userId} className="text-white font-semibold text-[11px]" style={{ fontFamily: F }}>{p.name.split(" ").pop()}</p>
                    ))}
                    <p className="text-white/60 text-[10px]" style={{ fontFamily: F }}>{myReg?.level}</p>
                  </div>
                </div>

                {/* VS / result */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  {myMatch.result ? (
                    <>
                      <span className="text-white text-[20px] font-black" style={{ fontFamily: M }}>{myMatch.result}</span>
                      {myMatch.winner && (
                        <span className="text-white/70 text-[10px]" style={{ fontFamily: F }}>
                          {myMatch.winner === myTeamKey ? "🏆 Bạn thắng" : "Thua"}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-white/60 text-[18px] font-black" style={{ fontFamily: M }}>VS</span>
                  )}
                </div>

                {/* Opponent team */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className={`flex ${isDoubles ? "-space-x-2" : ""}`}>
                    {opponentTeam.map(p => (
                      <img key={p.userId} src={p.avatar} alt="" className={`${isDoubles ? "w-12 h-12" : "w-16 h-16"} rounded-2xl border-2 border-white/30 object-cover`} />
                    ))}
                  </div>
                  <div className="text-center">
                    {opponentTeam.map(p => (
                      <p key={p.userId} className="text-white font-semibold text-[11px]" style={{ fontFamily: F }}>{p.name.split(" ").pop()}</p>
                    ))}
                    {opponentRegs[0] && <p className="text-white/60 text-[10px]" style={{ fontFamily: F }}>{opponentRegs[0].level}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Opponent(s) profile cards */}
            {opponentRegs.filter(Boolean).map((opp, idx) => opp && (
              <div key={opp.userId} className="bg-white border border-[#eef2ec] rounded-2xl overflow-hidden">
                <button onClick={() => setShowOpponentProfile(showOpponentProfile ? false : opp.userId)}
                  className="w-full flex items-center gap-3 px-4 py-3.5">
                  <img src={opp.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{opp.name}</p>
                      {isDoubles && <span className="text-[10px] bg-[#f0f4f0] text-[#5a6a59] px-1.5 py-0.5 rounded-full" style={{ fontFamily: F }}>Đối thủ {idx + 1}</span>}
                    </div>
                    <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>
                      {opp.level}{opp.elo ? ` · ELO ${opp.elo}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#006e26] font-medium" style={{ fontFamily: F }}>Hồ sơ</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className={`transition-transform ${showOpponentProfile === opp.userId ? "rotate-180" : ""}`}>
                      <path d="M2 4L6 8L10 4" stroke="#c0cdbf" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                {showOpponentProfile === opp.userId && (
                  <div className="border-t border-[#f3f7f3] px-4 pb-4 pt-3 flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { l: "Trình độ", v: opp.level },
                        { l: "ELO", v: opp.elo ? String(opp.elo) : "–" },
                        { l: "Môn", v: session.sport === "Cầu lông" ? "🏸" : session.sport === "Tennis" ? "🎾" : "🏓" },
                      ].map(s => (
                        <div key={s.l} className="bg-[#f6f9f6] rounded-xl p-2 text-center">
                          <p className="text-[14px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{s.v}</p>
                          <p className="text-[9px] text-[#9aaa99] mt-0.5" style={{ fontFamily: F }}>{s.l}</p>
                        </div>
                      ))}
                    </div>
                    {opp.elo && (() => {
                      const lvl = getSkillLevel(opp.elo / 500, session.sport ?? "Cầu lông");
                      return (
                        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 border" style={{ background: lvl.bg, borderColor: lvl.color + "30" }}>
                          <span className="text-[22px] font-black" style={{ fontFamily: M, color: lvl.color }}>{lvl.label}</span>
                          <div>
                            <p className="text-[12px] font-semibold" style={{ fontFamily: F, color: lvl.color }}>{lvl.desc}</p>
                            <p className="text-[10px] opacity-70" style={{ fontFamily: F, color: lvl.color }}>{session.format === "doubles" ? "Đôi" : "Đơn"} · {session.sport}</p>
                          </div>
                        </div>
                      );
                    })()}
                    <p className="text-[11px] text-[#9ca3af] text-center" style={{ fontFamily: F }}>
                      Thông tin từ hệ thống đánh giá trình độ
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── No match yet but session in_progress ── */}
        {session.status === "in_progress" && !myMatch && (
          <div className="bg-[#fee2e2] border border-[#fca5a5] rounded-2xl p-4 text-center">
            <p className="text-[#dc2626] font-semibold text-[14px]" style={{ fontFamily: F }}>Bạn không có trận đấu trong buổi này</p>
            <p className="text-[#dc2626]/70 text-[12px] mt-1" style={{ fontFamily: F }}>Số người lẻ hoặc bạn đăng ký sau khi trận đã được sắp xếp</p>
          </div>
        )}

        {/* All matches (collapsed view) */}
        {session.matches.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>
              Tất cả trận ({session.matches.length})
            </p>
            <div className="flex flex-col gap-2">
              {session.matches.map(m => {
                const isMyMatch = m.team1.some(p => p.userId === PLAYER_ID) || m.team2.some(p => p.userId === PLAYER_ID);
                const team1Label = m.team1.map(p => p.name.split(" ").pop()).join("/");
                const team2Label = m.team2.map(p => p.name.split(" ").pop()).join("/");
                return (
                  <div key={m.id} className={`border rounded-2xl px-4 py-3 ${isMyMatch ? "border-[#006e26] bg-[#f0faf4]" : "border-[#eef2ec] bg-white"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isMyMatch ? "bg-[#006e26] text-white" : "bg-[#e8f5ee] text-[#006e26]"}`} style={{ fontFamily: F }}>
                        {m.court}
                      </span>
                      {m.result && <span className="text-[12px] font-black" style={{ fontFamily: M, color: G }}>{m.result}</span>}
                      {isMyMatch && !m.result && <span className="text-[10px] font-medium text-[#006e26]" style={{ fontFamily: F }}>Trận của bạn</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1 flex-1 min-w-0 items-center">
                        {m.team1.map(p => <img key={p.userId} src={p.avatar} alt="" className="w-7 h-7 rounded-full border border-white object-cover" />)}
                        <span className="text-[12px] font-medium text-[#1a1a1a] truncate pl-2" style={{ fontFamily: F }}>{team1Label}</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#c0cdbf]" style={{ fontFamily: M }}>VS</span>
                      <div className="flex -space-x-1 flex-1 min-w-0 items-center justify-end">
                        <span className="text-[12px] font-medium text-[#1a1a1a] truncate pr-2 text-right" style={{ fontFamily: F }}>{team2Label}</span>
                        {m.team2.map(p => <img key={p.userId} src={p.avatar} alt="" className="w-7 h-7 rounded-full border border-white object-cover" />)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Registrations */}
        <div>
          <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>Người tham gia ({session.registrations.length})</p>
          <div className="flex flex-col gap-2">
            {session.registrations.map(r => (
              <div key={r.userId} className="bg-white border border-[#eef2ec] rounded-xl px-3 py-2.5 flex items-center gap-3">
                <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{r.name}</p>
                  <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{r.level}{r.elo ? ` · ELO ${r.elo}` : ""}</p>
                </div>
                {r.userId === PLAYER_ID && <span className="text-[10px] bg-[#e8f5ee] text-[#006e26] font-bold px-1.5 py-0.5 rounded-full" style={{ fontFamily: F }}>Bạn</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

