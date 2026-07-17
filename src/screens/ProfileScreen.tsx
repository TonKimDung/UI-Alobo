import { useState } from "react";
import type React from "react";
import { SelfAssessmentScreen } from "./SelfAssessmentScreen"; 
import {
  G, F, M, CRITERIA, SCORE_LABELS, SCORE_COLORS, SCORE_BG, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, EQUAL_WEIGHTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, scoreToPercent, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, ScoreBadge, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";

const sportIcon = (sport?: Sport) => sport === "Cầu lông" ? "🏸" : sport === "Tennis" ? "🎾" : "🏓";

const ratingSuffix = (sport?: Sport) => {
  if (sport === "Tennis") return "NTRP";
  if (sport === "Pickleball") return "DURP";
  return "Level";
};

// Internal ELO estimate from the weighted assessment score.
// This is only sample UI data and can be replaced by API data later.
const getEloFromScore = (ws: number) => {
  const elo = Math.round(800 + (Math.max(0, Math.min(5, ws)) / 5) * 1200);
  return Math.round(elo / 10) * 10;
};

export function ProfileScreen({ role, sessions, onLogout }: { role: Role; sessions: Session[]; onLogout: () => void }) {
  const [showSelfAssessment, setShowSelfAssessment] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [ownerTrustScore, setOwnerTrustScore] = useState("0.65");
  const [ownerBankNumber, setOwnerBankNumber] = useState("0123456789");
  const [ownerExtraInfo, setOwnerExtraInfo] = useState("Chủ sân có thể tự thêm ghi chú, mô tả sân hoặc thông tin liên hệ tại đây.");
  const [isEditingOwnerProfile, setIsEditingOwnerProfile] = useState(false);
  const [ownerVerificationStatus, setOwnerVerificationStatus] = useState<"draft" | "pending" | "verified">("pending");

  const ownerEvidence = [
    { label: "Giấy phép kinh doanh", status: "Đã upload", icon: "🏢" },
    { label: "Hình ảnh sân", status: "5 ảnh", icon: "🖼️" },
    { label: "Chứng chỉ huấn luyện", status: "Đã upload", icon: "🎓" },
    { label: "Chứng chỉ trọng tài", status: "Chưa có", icon: "🧾" },
    { label: "Bằng cấp / thành tích", status: "Đã upload", icon: "🏅" },
    { label: "Google Maps / Fanpage", status: "Đã liên kết", icon: "🌐" },
  ];

  const ownerMonthlyPlayers = [92, 118, 136, 152, 171, 188];
  const ownerTrustPercent = Math.round(Math.max(0, Math.min(1, Number(ownerTrustScore) || 0)) * 100);

  // Build player assessment history: sessions where PLAYER_ID has a score
  const assessments = sessions
  .filter(s => s.scores[PLAYER_ID] && s.registrations.some(r => r.userId === PLAYER_ID && r.status === "confirmed"))
  .map(s => {
    const ws = computeScore(s.scores[PLAYER_ID], s.criteriaWeights);
    const lvl = getSkillLevel(ws, s.sport ?? "Cầu lông");

    const currentElo = getEloFromScore(ws);

    // Demo dữ liệu thay đổi ELO
    const eloChange =
      ws >= 4.5 ? 45 :
      ws >= 4 ? 32 :
      ws >= 3.5 ? 20 :
      ws >= 3 ? 10 :
      -8;

    return {
      session: s,
      ws,
      lvl,
      currentElo,
      previousElo: currentElo - eloChange,
      eloChange,
    };
  })
  .sort((a, b) => new Date(b.session.date).getTime() - new Date(a.session.date).getTime());

  // Best level per sport
  const bestBySport: Record<string, { lvl: SkillLevel; ws: number; elo: number; venueName: string }> = {};
  for (const { session: s, ws, lvl } of assessments) {
    const sport = s.sport ?? "Cầu lông";
    if (!bestBySport[sport] || ws > bestBySport[sport].ws) {
      bestBySport[sport] = { lvl, ws, elo: getEloFromScore(ws), venueName: s.venueName };
    }
  }

  const visibleAssessments = showAllHistory ? assessments : assessments.slice(0, 2);
  const currentAssessment = assessments[0];
  const currentElo = currentAssessment ? getEloFromScore(currentAssessment.ws) : null;

  const isPlayer = role === "player";
  const name = isPlayer ? PLAYER_NAME : "Nguyễn Văn A";
  const avatar = isPlayer ? PLAYER_AVATAR : scoreAvatar;

  if (showSelfAssessment) {
    return <SelfAssessmentScreen onBack={() => setShowSelfAssessment(false)} />;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      {/* Header */}
      <div className="px-5 pt-12 pb-5 bg-white border-b border-[#eef2ec]">
        <div className="flex items-center gap-4">
          <img src={avatar} alt="Profile" className="w-16 h-16 rounded-2xl object-cover" />
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{name}</h1>
            <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>
              {isPlayer ? "Người chơi" : "Chủ sân"} · ALOBO
            </p>
          </div>
        </div>

        
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Self assessment entry — player only */}
        {isPlayer && (
          <button
            onClick={() => setShowSelfAssessment(true)}
            className="w-full bg-gradient-to-br from-[#006e26] to-[#159447] rounded-2xl px-4 py-4 text-left shadow-[0_6px_18px_rgba(0,110,38,0.22)] active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-[22px]">🎯</div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-white" style={{ fontFamily: F }}>Tự đánh giá trình độ</p>  
              </div>
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                <path d="M1 1L8 7.5L1 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        )}

        {/* Owner profile — owner only */}
        {!isPlayer && (
          <div className="bg-white rounded-2xl border border-[#eef2ec] overflow-hidden">
            <div className="px-4 py-3.5 border-b border-[#eef2ec] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider" style={{ fontFamily: M }}>
                  Verification Center
                </p>
                <p className="text-[13px] text-[#5a6a59] mt-0.5" style={{ fontFamily: F }}>
                  Bổ sung hồ sơ để Admin xác thực Trust Score.
                </p>
              </div>
              <button
                onClick={() => setIsEditingOwnerProfile(!isEditingOwnerProfile)}
                className="px-3 py-2 rounded-xl bg-[#f6f9f6] text-[#006e26] text-[12px] font-semibold border border-[#dfe9df]"
                style={{ fontFamily: F }}
              >
                {isEditingOwnerProfile ? "Xong" : "Chỉnh sửa"}
              </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <div className="bg-[#f6f9f6] rounded-2xl p-4 border border-[#eef2ec]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-[#7a8a79]" style={{ fontFamily: F }}>Trust Score</p>
                    <p className="text-[30px] font-black text-[#006e26] leading-none mt-1" style={{ fontFamily: M }}>{ownerTrustScore}</p>
                    <p className="text-[11px] text-[#7a8a79] mt-1" style={{ fontFamily: F }}>
                      {ownerVerificationStatus === "verified" ? "Đã xác thực" : "Đang chờ Admin xác thực"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1.5 rounded-full bg-[#fff7ed] text-[#c2410c] text-[11px] font-bold" style={{ fontFamily: F }}>
                      {ownerTrustScore && Number(ownerTrustScore) > 0.5 ? "Tự duyệt kết quả" : "Cần Admin duyệt"}
                    </div>
                    <p className="text-[10px] text-[#9aaa99] mt-2" style={{ fontFamily: F }}>
                      Ngưỡng auto approve: &gt; 0.5
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden mt-3">
                  <div className="h-full rounded-full bg-[#006e26]" style={{ width: `${ownerTrustPercent}%` }} />
                </div>
              </div>

              {isEditingOwnerProfile && (
                <div>
                  <p className="text-[11px] font-semibold text-[#7a8a79] mb-1" style={{ fontFamily: F }}>Trust Score</p>
                  <IOSInput
                    value={ownerTrustScore}
                    onChange={(v: string) => setOwnerTrustScore(v)}
                    placeholder="Nhập Trust Score, ví dụ 0.65"
                  />
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold text-[#7a8a79] mb-1" style={{ fontFamily: F }}>Bank Number</p>
                {isEditingOwnerProfile ? (
                  <IOSInput
                    value={ownerBankNumber}
                    onChange={(v: string) => setOwnerBankNumber(v)}
                    placeholder="Nhập số tài khoản ngân hàng"
                  />
                ) : (
                  <div className="bg-[#f6f9f6] rounded-xl px-3 py-2.5 border border-[#eef2ec]">
                    <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{ownerBankNumber || "Chưa cập nhật"}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#7a8a79] mb-2" style={{ fontFamily: F }}>Minh chứng chủ sân</p>
                <div className="grid grid-cols-2 gap-2">
                  {ownerEvidence.map(item => (
                    <button key={item.label} className="bg-[#f6f9f6] rounded-2xl border border-[#eef2ec] px-3 py-3 text-left active:scale-[0.98] transition-transform">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px]">{item.icon}</span>
                        <p className="text-[12px] font-semibold text-[#1a1a1a] leading-tight" style={{ fontFamily: F }}>{item.label}</p>
                      </div>
                      <p className={`text-[10px] mt-1 font-semibold ${item.status === "Chưa có" ? "text-[#dc2626]" : "text-[#006e26]"}`} style={{ fontFamily: M }}>
                        {item.status}
                      </p>
                    </button>
                  ))}
                </div>
                <button className="w-full mt-2 py-3 rounded-2xl border border-dashed border-[#bdd6bd] text-[#006e26] text-[13px] font-bold bg-[#f6f9f6]" style={{ fontFamily: F }}>
                  + Upload minh chứng mới
                </button>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#7a8a79] mb-1" style={{ fontFamily: F }}>Thông tin thêm</p>
                {isEditingOwnerProfile ? (
                  <IOSTextarea
                    value={ownerExtraInfo}
                    onChange={(v: string) => setOwnerExtraInfo(v)}
                    placeholder="Tự thêm thông tin chủ sân"
                  />
                ) : (
                  <div className="bg-[#f6f9f6] rounded-xl px-3 py-2.5 border border-[#eef2ec]">
                    <p className="text-[13px] text-[#5a6a59] leading-relaxed whitespace-pre-line" style={{ fontFamily: F }}>
                      {ownerExtraInfo || "Chưa cập nhật"}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setOwnerVerificationStatus("pending")}
                className="w-full py-3.5 rounded-2xl bg-[#006e26] text-white text-[14px] font-bold shadow-[0_4px_14px_rgba(0,110,38,0.25)]"
                style={{ fontFamily: F }}
              >
                Gửi hồ sơ xác thực Trust Score
              </button>
            </div>
          </div>
        )}

        {/* Best levels summary — player only */}
        {isPlayer && Object.keys(bestBySport).length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>
              Điểm trình theo môn
            </p>
            <div className="flex flex-col gap-2">
              {Object.entries(bestBySport).map(([sport, { lvl, elo, venueName }]) => (
                <div key={sport} className="bg-white border border-[#eef2ec] rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-[18px]">{sportIcon(sport as Sport)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{sport}</p>
                    <p className="text-[11px] text-[#7a8a79] truncate" style={{ fontFamily: F }}>{venueName}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[12px] font-medium" style={{ color: lvl.color, fontFamily: F }}>
                      {lvl.label} {ratingSuffix(sport as Sport)}
                    </span>
                    <span className="text-[10px] font-black" style={{ fontFamily: M, color: lvl.color }}>{elo}</span>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assessment history — player only */}
        {isPlayer && (
          <div>
            <p className="text-[11px] font-semibold text-[#7a8a79] uppercase tracking-wider mb-2" style={{ fontFamily: M }}>
              Buổi đánh giá gần nhất
            </p>

            {assessments.length === 0 && (
              <div className="bg-white rounded-2xl p-5 text-center border border-[#eef2ec]">
                <p className="text-[14px] text-[#7a8a79]" style={{ fontFamily: F }}>Chưa có kết quả đánh giá nào</p>
                <p className="text-[12px] text-[#b0b8b0] mt-1" style={{ fontFamily: F }}>Tham gia buổi đánh giá để xem trình độ của bạn</p>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {visibleAssessments.map(({ session: s, ws, lvl, currentElo, previousElo, eloChange }) => {
                const expanded = expandedId === s.id;
                return (
                  <div key={s.id} className="bg-white border border-[#eef2ec] rounded-2xl overflow-hidden">
                    {/* Main row */}
                    <button
                      onClick={() => setExpandedId(expanded ? null : s.id)}
                      className="w-full px-4 py-3.5 flex items-center gap-3 text-left"
                    >
                      {/* Sport icon */}
                      <span className="text-[22px] flex-shrink-0">
                        {sportIcon(s.sport)}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{s.title}</p>
                        <p className="text-[11px] font-semibold text-[#006e26] truncate" style={{ fontFamily: F }}>{s.venueName}</p>
                        <p className="text-[11px] text-[#9aaa99]" style={{ fontFamily: F }}>
                          {s.date.split("-").reverse().join("/")} · {s.ownerName}
                        </p>
                      </div>

                      {/* Level badge + chevron */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-[13px] font-semibold mt-0.5" style={{ fontFamily: F, color: lvl.color }}>
                            {lvl.label} {ratingSuffix(s.sport)}
                          </span>
                          <span className="text-[10px] font-black px-2.5 py-1 rounded-xl"
                            style={{ fontFamily: M, color: lvl.color, background: lvl.bg }}>
                            {getEloFromScore(ws)} ELO
                          </span>
                          
                          <span
  className="text-[10px] font-bold mt-1"
  style={{
    fontFamily: M,
    color: eloChange >= 0 ? "#16a34a" : "#dc2626",
  }}
>
  {previousElo} → {currentElo}
  {"  "}
  ({eloChange >= 0 ? "+" : ""}
  {eloChange} ELO)
</span>
                        </div>
                        <svg
                          width="12" height="12" viewBox="0 0 12 12" fill="none"
                          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                        >
                          <path d="M2 4L6 8L10 4" stroke="#c0cdbf" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded criteria breakdown */}
                    {expanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-[#f3f7f3]">
                        <p className="text-[10px] font-semibold text-[#9aaa99] uppercase tracking-wider mb-2 mt-3" style={{ fontFamily: M }}>
                          Chi tiết tiêu chí
                        </p>
                        <div className="flex flex-col gap-2">
                          {CRITERIA.map(c => {
                            const raw = s.scores[PLAYER_ID]?.[c.id] ?? 0;
                            const pct = Math.round((raw / 5) * 100);
                            return (
                              <div key={c.id} className="flex items-center gap-2">
                                <span className="text-[13px] w-5 text-center">{c.emoji}</span>
                                <p className="text-[12px] text-[#5a6a59] flex-1" style={{ fontFamily: F }}>{c.name}</p>
                                <div className="w-20 h-1.5 bg-[#eef2ec] rounded-full overflow-hidden">
                                  <div className="h-full rounded-full"
                                    style={{ width: `${pct}%`, background: SCORE_COLORS[raw] || "#e5ebe4" }} />
                                </div>
                                <span className="text-[11px] font-semibold w-14 text-right"
                                  style={{ fontFamily: M, color: SCORE_COLORS[raw] || "#9ca3af" }}>
                                  {SCORE_LABELS[raw] || "–"}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Weighted score detail */}
                        <div className="mt-3 pt-3 border-t border-[#f3f7f3] flex items-center justify-between">
                          <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>Điểm ELO & trình độ</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] font-black" style={{ fontFamily: M, color: lvl.color }}>
                              {getEloFromScore(ws)} ELO
                            </span>
                            <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>
                              {lvl.label} {ratingSuffix(s.sport)} · {lvl.desc}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {assessments.length > 2 && (
              <button
                onClick={() => setShowAllHistory(!showAllHistory)}
                className="w-full mt-3 py-3 rounded-2xl bg-white border border-[#dfe9df] text-[#006e26] text-[13px] font-semibold"
                style={{ fontFamily: F }}
              >
                {showAllHistory ? "Thu gọn lịch sử" : `Xem thêm ${assessments.length - 2} buổi đánh giá`}
              </button>
            )}
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-[#eef2ec] overflow-hidden">
          {[ "Thông báo", "Trợ giúp"].map((item, i, arr) => (
            <button key={item} className={`w-full flex items-center gap-3 px-4 py-4 text-left ${i < arr.length - 1 ? "border-b border-[#eef2ec]" : ""}`}>
              <span className="flex-1 text-[14px] text-[#1a1a1a] font-medium" style={{ fontFamily: F }}>{item}</span>
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                <path d="M1 1L7 6.5L1 12" stroke="#c0cdbf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        <Btn variant="ghost" onClick={onLogout}>Đăng xuất</Btn>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}
