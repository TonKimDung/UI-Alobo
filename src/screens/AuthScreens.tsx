import { useState } from "react";
import type React from "react";
import {
  G, F, M, CRITERIA, SCORE_LABELS, SCORE_COLORS, SCORE_BG, PLAYER_AVATARS, PLAYER_LEVELS, MIN_PARTICIPANTS, EQUAL_WEIGHTS, CANCEL_DAYS_BEFORE,
  PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE, bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar,
  canModifySession, daysUntil, computeScore, scoreToPercent, getSkillLevel, BADMINTON_LEVELS, RACKET_LEVELS,
  SkillLevelBadge, Logo, IOSInput, IOSTextarea, Btn, BackBtn, StatusDot, ScoreBadge, TabBar,
  type Role, type ApprovalType, type Sport, type Session, type Registration, type ChallengeStatus, type ChallengeMatch, type MatchmakingSession, type MatchPair, type MatchPlayer, type MatchFormat, type RegStatus, type SkillLevel
} from "../app/shared";

export function LoginScreen({ onLogin, onRegister }: { onLogin: (role: Role) => void; onRegister: () => void }) {
  const [role, setRole] = useState<Role>("owner");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="relative px-6 pt-14 pb-8 flex flex-col items-center gap-3 overflow-hidden" style={{ background: "linear-gradient(170deg,#004d1c 0%,#006e26 60%,#1a8a3e 100%)" }}>
        <div className="absolute inset-0 opacity-10"><img src={bgTexture} alt="" className="w-full h-full object-cover" /></div>
        <div className="relative z-10 flex flex-col items-center gap-2">
          <Logo size={58} />
          <h1 className="text-white text-[28px] font-black tracking-tight" style={{ fontFamily: F }}>ALOBO</h1>
          <p className="text-white/60 text-[13px]" style={{ fontFamily: F }}>Quản lý & đánh giá trình độ thể thao</p>
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 pb-10 flex flex-col gap-4">
        <h2 className="text-[#1a1a1a] text-[22px] font-bold" style={{ fontFamily: F }}>Đăng nhập</h2>

        <div className="bg-[#eaf0e9] p-1 rounded-2xl flex gap-1">
          {(["owner", "player"] as Role[]).map(r => (
            <button key={r} onClick={() => setRole(r)}
              className={`flex-1 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${role === r ? "bg-white text-[#006e26] shadow-sm" : "text-[#7a8a79]"}`}
              style={{ fontFamily: F }}>
              {r === "owner" ? "Chủ sân" : "Người chơi"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <IOSInput placeholder="Email hoặc số điện thoại" value={email} onChange={setEmail} />
          <IOSInput placeholder="Mật khẩu" type={showPw ? "text" : "password"} value={pw} onChange={setPw}
            right={<button onClick={() => setShowPw(!showPw)}>
              <svg width="20" height="14" viewBox="0 0 22 15" fill="none"><path d={loginSvg.p3e801e80} fill="#aab9aa" /></svg>
            </button>} />
          <button className="self-end text-[#006e26] text-[13px] font-semibold" style={{ fontFamily: F }}>Quên mật khẩu?</button>
        </div>

        <Btn onClick={() => onLogin(role)}>Đăng nhập</Btn>
        <p className="text-center text-[#7a8a79] text-[14px]" style={{ fontFamily: F }}>
          Chưa có tài khoản?{" "}
          <button onClick={onRegister} className="text-[#006e26] font-bold">Đăng ký</button>
        </p>
      </div>
    </div>
  );
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
export function RegisterScreen({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-[#eef2ec]">
        <BackBtn onClick={onBack} />
        <h1 className="text-[22px] font-bold text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>Tạo tài khoản</h1>
      </div>
      <div className="flex-1 px-5 py-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-[#e8f5ee] rounded-2xl p-4">
          <Logo size={36} />
          <div>
            <p className="text-[#006e26] font-semibold text-[13px]" style={{ fontFamily: F }}>ALOBO · Đánh giá trình độ</p>
            <p className="text-[#5a8a6a] text-[11px]" style={{ fontFamily: F }}>Hệ thống đánh giá theo tiêu chí chuẩn</p>
          </div>
        </div>
        <IOSInput label="Họ và tên" placeholder="Nguyễn Văn A" value={name} onChange={setName} />
        <IOSInput label="Email" placeholder="example@email.com" type="email" value={email} onChange={setEmail} />
        <IOSInput label="Số điện thoại" placeholder="0901 234 567" type="tel" value={phone} onChange={setPhone} />
        <IOSInput label="Mật khẩu" placeholder="Tối thiểu 8 ký tự" type={showPw ? "text" : "password"} value={pw} onChange={setPw}
          right={<button onClick={() => setShowPw(!showPw)}>
            <svg width="20" height="14" viewBox="0 0 22 15" fill="none"><path d={loginSvg.p3e801e80} fill="#aab9aa" /></svg>
          </button>} />
        <label className="flex items-start gap-3 cursor-pointer">
          <button onClick={() => setAgreed(!agreed)}
            className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${agreed ? "bg-[#006e26] border-[#006e26]" : "border-[#d0dace]"}`}>
            {agreed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </button>
          <span className="text-[#5a6a59] text-[13px] leading-relaxed" style={{ fontFamily: F }}>
            Tôi đồng ý với <span className="text-[#006e26] font-semibold">Điều khoản</span> và <span className="text-[#006e26] font-semibold">Chính sách bảo mật</span>
          </span>
        </label>
        <Btn onClick={onDone} disabled={!agreed || !name || !email || !pw}>Tạo tài khoản</Btn>
        <p className="text-center text-[#7a8a79] text-[14px]" style={{ fontFamily: F }}>
          Đã có tài khoản? <button onClick={onBack} className="text-[#006e26] font-bold">Đăng nhập</button>
        </p>
      </div>
    </div>
  );
}
