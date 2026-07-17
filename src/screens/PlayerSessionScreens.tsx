import { useState } from "react";
import type React from "react";
import {
  G, F, M, CRITERIA, SCORE_LABELS, SCORE_COLORS, SCORE_BG, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, EQUAL_WEIGHTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";

export function formatFee(fee: number): string {
  if (fee === 0) return "Miễn phí";
  if (fee >= 1000000) return `${(fee / 1000000).toFixed(1).replace(".0", "")} triệu`;
  return `${(fee / 1000).toFixed(0)}k`;
}



const ASSESSOR_PROFILE = {
  name: "HLV Minh Quân",
  role: "Người chấm trình",
  trustScore: 0.85,
  certificates: ["Chứng chỉ HLV cộng đồng", "5 năm kinh nghiệm chấm trình", "Trọng tài giải phong trào"],
};

function getSportScoreDisplay(score: number, sport: Sport) {
  const lvl = getSkillLevel(score, sport);
  const scale = sport === "Cầu lông" ? "Cầu lông" : sport === "Tennis" ? "NTRP Tennis" : "Pickleball";
  return { ...lvl, scale };
}

export function FeePaymentCard({ fee, sessionTitle }: { fee: number; sessionTitle: string }) {
  const [showQR, setShowQR] = useState(false);

  // VietQR public API — works with real QR scanners
  const qrUrl = fee > 0
    ? `https://img.vietqr.io/image/MB-1234567890-compact2.png?amount=${fee}&addInfo=${encodeURIComponent("Le phi: " + sessionTitle)}&accountName=ALOBO%20Sports`
    : null;

  if (fee === 0) {
    return (
      <div className="flex items-center gap-3 bg-[#EBFAEE] border border-[#B9E7C6] rounded-2xl px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-[#006D38]/10 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#006D38" /></svg>
        </div>
        <div>
          <p className="text-[#15803d] font-semibold text-[13px]" style={{ fontFamily: F }}>Miễn phí tham gia</p>
          <p className="text-[#15803d]/70 text-[11px]" style={{ fontFamily: F }}>Không yêu cầu đóng lệ phí</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] overflow-hidden">
      {/* Fee header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E0E0E5]">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Lệ phí tham gia</p>
            <p className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>Thanh toán trước buổi đánh giá</p>
          </div>
        </div>
        <span className="text-[20px] font-black" style={{ fontFamily: M, color: G }}>
          {formatFee(fee)}
        </span>
      </div>

      {/* Bank info */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>
          <p className="font-semibold text-[#1a1a1a]">MB Bank · 1234 5678 90</p>
          <p>ALOBO Sports</p>
          <p className="text-[10px] text-[#9ca3af] mt-0.5">Nội dung: <span className="font-medium text-[#5A5A5F]">Le phi: {sessionTitle.slice(0, 20)}</span></p>
        </div>
        <button
          onClick={() => setShowQR(!showQR)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all ${showQR ? "border-[#006D38] bg-[#EBFAEE]" : "border-[#E0E0E5] bg-[#EDEDED]"}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke={showQR ? G : "#5A5A5F"} strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke={showQR ? G : "#5A5A5F"} strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke={showQR ? G : "#5A5A5F"} strokeWidth="1.8" />
            <path d="M14 14H17M17 14V17M17 17H20M20 17V20M20 20H14M14 20V17" stroke={showQR ? G : "#5A5A5F"} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="text-[9px] font-semibold" style={{ fontFamily: F, color: showQR ? G : "#5A5A5F" }}>QR Pay</span>
        </button>
      </div>

      {/* QR code panel */}
      {showQR && qrUrl && (
        <div className="border-t border-[#E0E0E5] px-4 py-4 flex flex-col items-center gap-3">
          <p className="text-[11px] text-[#5A5A5F] text-center" style={{ fontFamily: F }}>
            Quét mã QR bằng app ngân hàng để thanh toán
          </p>
          <div className="p-3 bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.08)]">
            <img
              src={qrUrl}
              alt="QR thanh toán"
              className="w-44 h-44 object-contain"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div className="flex items-center gap-2 bg-[#EBFAEE] rounded-xl px-3 py-2">
            <span className="text-[#006D38] text-[18px] font-black" style={{ fontFamily: M }}>{formatFee(fee)}</span>
            <span className="text-[#006D38] text-[11px] font-medium" style={{ fontFamily: F }}>· MB Bank 1234567890</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PLAYER HOME (browse sessions) ───────────────────────────────────────────
export function PlayerHomeScreen({ sessions, myRegs, onJoin, onSessionTap }: {
  sessions: Session[];
  myRegs: Record<number, RegStatus>;
  onJoin: (sessionId: number) => void;
  onSessionTap: (id: number) => void;
}) {
  const openSessions = sessions.filter(s => s.status === "open" || s.status === "in_progress");

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white shadow-[0_1px_0_rgba(10,13,18,0.06)]">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <div>
            <p className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>Xin chào</p>
            <h1 className="text-[17px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{PLAYER_NAME} · Người chơi</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        <h2 className="text-[16px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Buổi đánh giá đang mở</h2>

        {openSessions.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
            <p className="text-[14px] text-[#5A5A5F]" style={{ fontFamily: F }}>Chưa có buổi đánh giá nào đang mở</p>
          </div>
        )}

        {openSessions.map(s => {
          const myStatus = myRegs[s.id];
          const confirmed = s.registrations.filter(r => r.status === "confirmed").length;
          const isFull = confirmed >= s.maxParticipants;

          return (
            <div key={s.id} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-4 shadow-sm">
              <button onClick={() => onSessionTap(s.id)} className="w-full text-left">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-[14px] font-semibold text-[#1a1a1a] flex-1 pr-2" style={{ fontFamily: F }}>{s.title}</h3>
                  <StatusDot status={s.status} />
                </div>
                <p className="text-[12px] font-semibold text-[#006D38] mb-0.5" style={{ fontFamily: F }}>{s.venueName}</p>
                <p className="text-[12px] text-[#5A5A5F] mb-2" style={{ fontFamily: F }}>
                  {s.date.split("-").reverse().join("/")} · {s.time} · {s.sport}
                </p>
                <p className="text-[12px] text-[#5A5A5F] mb-3 line-clamp-2" style={{ fontFamily: F }}>{s.description}</p>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {s.approvalType === "auto"
                    ? <span className="text-[11px] bg-[#EBFAEE] text-[#006D38] font-semibold px-2 py-0.5 rounded-full" style={{ fontFamily: F }}>Tự động duyệt</span>
                    : <span className="text-[11px] bg-[#fef3c7] text-[#92400e] font-semibold px-2 py-0.5 rounded-full" style={{ fontFamily: F }}>Xét duyệt</span>}
                  <span className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>{confirmed}/{s.maxParticipants} chỗ</span>
                  {(s.fee ?? 0) > 0
                    ? <span className="text-[11px] bg-[#fef3c7] text-[#92400e] font-semibold px-2 py-0.5 rounded-full" style={{ fontFamily: F }}>{formatFee(s.fee)}</span>
                    : <span className="text-[11px] bg-[#dcfce7] text-[#15803d] font-semibold px-2 py-0.5 rounded-full" style={{ fontFamily: F }}>Miễn phí</span>}
                </div>
              </button>

              {myStatus ? (
                <div className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-semibold ${myStatus === "confirmed" ? "bg-[#dcfce7] text-[#15803d]" : myStatus === "pending" ? "bg-[#fef3c7] text-[#92400e]" : "bg-[#fee2e2] text-[#dc2626]"}`}
                  style={{ fontFamily: F }}>
                  {myStatus === "confirmed" ? "Đã xác nhận" : myStatus === "pending" ? "Đang chờ duyệt" : "Bị từ chối"}
                </div>
              ) : (
                <button onClick={() => !isFull && onJoin(s.id)}
                  disabled={isFull}
                  className="w-full bg-[#006D38] text-white py-2.5 rounded-xl text-[13px] font-semibold shadow-[0_2px_8px_rgba(10,13,18,0.12)] disabled:opacity-40"
                  style={{ fontFamily: F }}>
                  {isFull ? "Đã đầy chỗ" : "Đăng ký tham gia"}
                </button>
              )}
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── PLAYER SESSION DETAIL ────────────────────────────────────────────────────
export function PlayerSessionDetailScreen({ session, myStatus, onBack, onCancelReg }: {
  session: Session; myStatus: RegStatus | undefined; onBack: () => void;
  onCancelReg: () => void;
}) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [showAssessorInfo, setShowAssessorInfo] = useState(false);
  const myScores = session.scores[PLAYER_ID];
  const ws = myScores ? computeScore(myScores, session.criteriaWeights) : null;
  const sportScore = ws !== null ? getSportScoreDisplay(ws, session.sport) : null;
  const canCancel = canModifySession(session) && (myStatus === "confirmed" || myStatus === "pending");
  const days = daysUntil(session.date);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white shadow-[0_1px_0_rgba(10,13,18,0.06)]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[20px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>{session.title}</h1>
        <p className="text-[12px] font-semibold text-[#006D38] mt-1" style={{ fontFamily: F }}>{session.venueName}</p>
        <div className="flex items-center gap-3 mt-1">
          <StatusDot status={session.status} />
          <span className="text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>
            {session.date.split("-").reverse().join("/")} · {session.time} · {session.sport}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Registration status */}
        {myStatus && (
          <div className={`flex items-center gap-2 p-3.5 rounded-2xl ${myStatus === "confirmed" ? "bg-[#dcfce7]" : myStatus === "pending" ? "bg-[#fef3c7]" : "bg-[#fee2e2]"}`}>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${myStatus === "confirmed" ? "bg-[#15803d]" : myStatus === "pending" ? "bg-[#d97706]" : "bg-[#dc2626]"}`} />
            <div>
              <p className={`font-semibold text-[13px] ${myStatus === "confirmed" ? "text-[#15803d]" : myStatus === "pending" ? "text-[#92400e]" : "text-[#dc2626]"}`}
                style={{ fontFamily: F }}>
                {myStatus === "confirmed" ? "Bạn đã được xác nhận" : myStatus === "pending" ? "Đang chờ chủ sân duyệt" : "Đã bị từ chối"}
              </p>
              <p className={`text-[11px] ${myStatus === "confirmed" ? "text-[#15803d]/70" : "text-[#92400e]/70"}`} style={{ fontFamily: F }}>
                {myStatus === "confirmed" ? "Có mặt đúng giờ để tham gia đánh giá" : "Chủ sân sẽ duyệt sớm nhất có thể"}
              </p>
            </div>
          </div>
        )}

        {/* Fee + QR — shown when registered */}
        {myStatus && myStatus !== "rejected" && (
          <FeePaymentCard fee={session.fee ?? 0} sessionTitle={session.title} />
        )}

        {/* Cancel registration */}
        {canCancel && !confirmCancel && (
          <Btn variant="danger" onClick={() => setConfirmCancel(true)}>
            Hủy đăng ký tham gia
          </Btn>
        )}
        {canCancel && confirmCancel && (
          <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-[13px] font-semibold text-[#dc2626]" style={{ fontFamily: F }}>
              Xác nhận hủy đăng ký? Còn {days} ngày trước buổi.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmCancel(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E0E0E5] bg-white text-[#1a1a1a] text-[13px] font-semibold"
                style={{ fontFamily: F }}>Không</button>
              <button onClick={() => { setConfirmCancel(false); onCancelReg(); }}
                className="flex-1 py-2.5 rounded-xl bg-[#dc2626] text-white text-[13px] font-semibold"
                style={{ fontFamily: F }}>Xác nhận hủy</button>
            </div>
          </div>
        )}
        {myStatus && !canModifySession(session) && session.status === "open" && (myStatus === "confirmed" || myStatus === "pending") && (
          <p className="text-center text-[11px] text-[#9ca3af]" style={{ fontFamily: F }}>
            Đã qua hạn hủy đăng ký ({CANCEL_DAYS_BEFORE} ngày trước buổi)
          </p>
        )}

        {/* My scores */}
        {myScores && ws !== null && sportScore && (
          <div className="bg-[#006D38] rounded-2xl p-4">
            <p className="text-white/70 text-[11px] font-semibold mb-1" style={{ fontFamily: F }}>Kết quả đánh giá của bạn</p>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-white text-[36px] font-black" style={{ fontFamily: M }}>{sportScore.label}</span>
              <div>
                <p className="text-white/80 text-[12px]" style={{ fontFamily: F }}>{sportScore.scale}</p>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={{ fontFamily: F, color: sportScore.color, background: sportScore.bg }}>
                  {session.sport}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowAssessorInfo(!showAssessorInfo)}
              className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 mb-3 text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-white text-[12px] font-semibold" style={{ fontFamily: F }}>{ASSESSOR_PROFILE.name}</p>
                  <p className="text-white/70 text-[11px]" style={{ fontFamily: F }}>{ASSESSOR_PROFILE.role}</p>
                </div>
                <span className="text-white/80 text-[11px] font-semibold" style={{ fontFamily: F }}>
                  {showAssessorInfo ? "Ẩn" : "Xem thêm"}
                </span>
              </div>
            </button>

            {showAssessorInfo && (
              <div className="bg-white rounded-xl px-3 py-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>Trust Score</p>
                  <span className="text-[14px] font-black" style={{ fontFamily: M, color: G }}>{ASSESSOR_PROFILE.trustScore}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ASSESSOR_PROFILE.certificates.map(cert => (
                    <span key={cert} className="text-[10px] font-semibold bg-[#EBFAEE] text-[#006D38] px-2 py-1 rounded-full" style={{ fontFamily: F }}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {CRITERIA.map(c => (
              <div key={c.id} className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
                <span className="flex-1 text-white/80 text-[11px]" style={{ fontFamily: F }}>{c.name}</span>
                <span className="text-[11px] font-bold text-white" style={{ fontFamily: M }}>{SCORE_LABELS[myScores[c.id] ?? 0]}</span>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-4">
          <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: F }}>Thông tin buổi</h3>
          <p className="text-[13px] text-[#5A5A5F]" style={{ fontFamily: F }}>{session.description || "Không có mô tả."}</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <p className="text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>
              {session.approvalType === "auto" ? "Tự động duyệt" : "Xét duyệt thủ công"}
            </p>
            <p className="text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>
              {session.registrations.filter(r => r.status === "confirmed").length}/{session.maxParticipants} chỗ
            </p>
            <p className="text-[12px] font-semibold" style={{ fontFamily: F, color: (session.fee ?? 0) > 0 ? "#92400e" : "#15803d" }}>
              {(session.fee ?? 0) > 0 ? `Lệ phí: ${formatFee(session.fee)}` : "Miễn phí"}
            </p>
          </div>
        </div>

        {/* Criteria preview */}
        
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── MY SESSIONS (Player) ─────────────────────────────────────────────────────
export function PlayerMySessionsScreen({ sessions, myRegs, onSessionTap }: {
  sessions: Session[];
  myRegs: Record<number, RegStatus>;
  onSessionTap: (id: number) => void;
}) {
  const mine = sessions.filter(s => myRegs[s.id]);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white shadow-[0_1px_0_rgba(10,13,18,0.06)]">
        <h1 className="text-[22px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Đăng ký của tôi</h1>
      </div>
      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        {mine.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
            <div className="w-12 h-12 rounded-2xl bg-[#EBFAEE] mx-auto mb-3 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 4H17C18.1 4 19 4.9 19 6V20H5V6C5 4.9 5.9 4 7 4Z" stroke="#006D38" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M9 2H15V6H9V2Z" stroke="#006D38" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M8 10H16M8 14H16M8 18H13" stroke="#006D38" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[14px] text-[#5A5A5F]" style={{ fontFamily: F }}>Bạn chưa đăng ký buổi nào</p>
          </div>
        )}
        {mine.map(s => {
          const myStatus = myRegs[s.id];
          const myScores = s.scores[PLAYER_ID];
          const ws = myScores ? computeScore(myScores, s.criteriaWeights) : null;
          const sportScore = ws !== null ? getSportScoreDisplay(ws, s.sport) : null;
          return (
            <button key={s.id} onClick={() => onSessionTap(s.id)} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-4 text-left w-full">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a] flex-1 pr-2" style={{ fontFamily: F }}>{s.title}</h3>
                {sportScore
                  ? <span className="text-[14px] font-black" style={{ fontFamily: M, color: G }}>{sportScore.label}</span>
                  : <StatusDot status={s.status} />}
              </div>
              <p className="text-[11px] font-semibold text-[#006D38] mb-0.5" style={{ fontFamily: F }}>{s.venueName}</p>
              <p className="text-[12px] text-[#5A5A5F] mb-2" style={{ fontFamily: F }}>{s.date.split("-").reverse().join("/")} · {s.time} · {s.sport}</p>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${myStatus === "confirmed" ? "bg-[#dcfce7] text-[#15803d]" : myStatus === "pending" ? "bg-[#fef3c7] text-[#92400e]" : "bg-[#fee2e2] text-[#dc2626]"}`}
                style={{ fontFamily: F }}>
                {myStatus === "confirmed" ? "Xác nhận" : myStatus === "pending" ? "Chờ duyệt" : "Từ chối"}
              </span>
            </button>
          );
        })}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── LEADERBOARD (per venue + sport) ───────────────────────────────────────────
export function LeaderboardScreen({ sessions, role }: { sessions: Session[]; role: Role }) {
  const venues = Array.from(new Set(sessions.map(s => s.venueName).filter(Boolean)));
  const sports: Sport[] = ["Cầu lông", "Tennis", "Pickleball"];

  // Owner defaults to their own venue; player starts at null (must pick)
  const defaultVenue = role === "owner"
    ? (sessions.find(s => s.ownerName === "Nguyễn Văn A")?.venueName ?? null)
    : null;
  const [selectedVenue, setSelectedVenue] = useState<string | null>(defaultVenue);
  const [selectedSport, setSelectedSport] = useState<Sport>("Cầu lông");

  const completedSessions = sessions.filter(s =>
    (s.status === "completed" || (s.status === "in_progress" && Object.keys(s.scores).length > 0))
    && s.venueName === selectedVenue
    && s.sport === selectedSport
  );

  const getRatingSuffix = (sport: Sport) => {
    if (sport === "Tennis") return "";
    return "";
  };

  // Aggregate best score per player within selected venue + selected sport
  const playerMap: Record<string, { name: string; avatar: string; level: string; bestScore: number; bestSport: Sport; sessionCount: number }> = {};
  for (const s of completedSessions) {
    for (const r of s.registrations) {
      if (r.status !== "confirmed") continue;
      const sc = s.scores[r.userId];
      if (!sc) continue;
      const ws = computeScore(sc, s.criteriaWeights);
      if (!playerMap[r.userId] || ws > playerMap[r.userId].bestScore) {
        playerMap[r.userId] = {
          name: r.name, avatar: r.avatar, level: r.level,
          bestScore: ws, bestSport: s.sport,
          sessionCount: (playerMap[r.userId]?.sessionCount ?? 0) + 1,
        };
      } else {
        playerMap[r.userId].sessionCount += 1;
      }
    }
  }

  const ranked = Object.entries(playerMap)
    .map(([userId, p]) => ({ userId, ...p }))
    .sort((a, b) => b.bestScore - a.bestScore);

  const medalLabel = ["1", "2", "3"];

  // ── View 1: Venue picker (shown when no venue selected) ──────────────────
  if (!selectedVenue) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
        <div className="px-5 pt-12 pb-5 bg-white shadow-[0_1px_0_rgba(10,13,18,0.06)]">
          <div className="flex items-center gap-2 mb-1">
            <Logo size={26} />
            <span className="text-[#5A5A5F] text-[12px]" style={{ fontFamily: F }}>ALOBO</span>
          </div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Bảng xếp hạng</h1>
          <p className="text-[13px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>Chọn sân để xem xếp hạng</p>
        </div>

        <div className="flex-1 px-4 py-5 flex flex-col gap-3">
          {venues.length === 0 && (
            <div className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
              <p className="text-[14px] text-[#5A5A5F]" style={{ fontFamily: F }}>Chưa có sân nào có dữ liệu</p>
            </div>
          )}
          {venues.map(v => {
            const count = sessions.filter(s => s.venueName === v &&
              (s.status === "completed" || s.status === "in_progress")).length;
            const owner = sessions.find(s => s.venueName === v)?.ownerName ?? "";
            return (
              <button key={v} onClick={() => setSelectedVenue(v)}
                className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(10,13,18,0.06)] p-4 text-left shadow-sm active:bg-[#EDEDED] transition-colors w-full">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[15px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{v}</p>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                    <path d="M1 1L7 6.5L1 12" stroke="#BDBDC2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[12px] text-[#5A5A5F]" style={{ fontFamily: F }}>Chủ sân: {owner}</p>
                <p className="text-[12px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>
                  {count} buổi đánh giá
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── View 2: Ranking for selected venue + sport ───────────────────────────
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#EDEDED]">
      <div className="px-5 pt-12 pb-4 bg-white shadow-[0_1px_0_rgba(10,13,18,0.06)]">
        <button onClick={() => setSelectedVenue(null)} className="flex items-center gap-1 text-[#006D38] text-[14px] font-medium mb-2" style={{ fontFamily: F }}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M8 1L1.5 7.5L8 14" stroke="#006D38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Đổi sân
        </button>
        <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-snug" style={{ fontFamily: F }}>{selectedVenue}</h1>
        <p className="text-[12px] text-[#5A5A5F] mt-0.5" style={{ fontFamily: F }}>
          {completedSessions.length} buổi đánh giá · {ranked.length} người chơi
        </p>

        <div className="mt-3 bg-[#F2F2F4] rounded-2xl p-1 flex gap-1">
          {sports.map(sp => {
            const count = sessions.filter(s =>
              (s.status === "completed" || (s.status === "in_progress" && Object.keys(s.scores).length > 0))
              && s.venueName === selectedVenue
              && s.sport === sp
            ).length;
            const active = selectedSport === sp;

            return (
              <button
                key={sp}
                onClick={() => setSelectedSport(sp)}
                className={`flex-1 rounded-xl py-2 text-[11px] font-semibold transition-colors ${active ? "bg-white text-[#006D38] shadow-sm" : "text-[#5A5A5F]"}`}
                style={{ fontFamily: F }}
              >
                {sp}
                <span className="block text-[9px] font-medium opacity-70 mt-0.5">{count} buổi</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-2.5">
        {ranked.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_8px_rgba(10,13,18,0.06)]">
            <p className="text-[14px] text-[#5A5A5F]" style={{ fontFamily: F }}>Chưa có dữ liệu xếp hạng cho môn này</p>
          </div>
        ) : ranked.map((p, idx) => {
          const lvl = getSkillLevel(p.bestScore, p.bestSport);
          return (
            <div key={p.userId} className={`flex items-center gap-3 rounded-2xl p-3.5 shadow-[0_2px_8px_rgba(10,13,18,0.06)] ${idx === 0 ? "bg-[#FFF9E8]" : "bg-white"}`}>
              <span className="w-6 text-center font-black text-[14px]" style={{ fontFamily: M, color: idx === 0 ? "#006D38" : idx < 3 ? ["#006D38","#5A5A5F","#8C5A2B"][idx] : "#949494" }}>
                {medalLabel[idx] ?? idx + 1}
              </span>
              <img src={p.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: F }}>{p.name}</p>
                <p className="text-[11px] text-[#5A5A5F]" style={{ fontFamily: F }}>
                  {p.bestSport} · {p.sessionCount} buổi
                </p>
              </div>
              <span className="text-[17px] font-black px-2.5 py-1 rounded-xl"
                style={{ fontFamily: M, color: lvl.color, background: lvl.bg }}>
                {lvl.label} {getRatingSuffix(p.bestSport)}
              </span>
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}
