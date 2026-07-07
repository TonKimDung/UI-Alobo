import { useState } from "react";
import logoImg from "@/imports/image.png";
import bgTexture from "@/imports/DangNhậpAloboSports/042098a97c6cf494dcdc9e4b6672d33c673e13f8.png";
import imgCourt from "@/imports/TạoSựKiệnDanhGiaChủSan/e59377cb5a6535afcae1bee35a6d98941988c1c6.png";
import loginSvg from "@/imports/DangNhậpAloboSports/svg-onuw6ix1w5";
import avatarA from "@/imports/BảngXếpHạngEloNgườiChơi/a7b753059a50e79de9db4e42e81c070edf8a80e5.png";
import avatarB from "@/imports/BảngXếpHạngEloNgườiChơi/7a2bfd255732f17d0a7d43085136373789df1f5a.png";
import avatarC from "@/imports/BảngXếpHạngEloNgườiChơi/d0d991b181781d1351b6c7841ee2463b6405c155.png";
import avatarD from "@/imports/BảngXếpHạngEloNgườiChơi/7ff93b9cee84c848059a3960f736742135015134.png";
import avatarE from "@/imports/BảngXếpHạngEloNgườiChơi/85c2423d8318aa4e6442e9dd07702ed5e516e29b.png";
import pAvatar1 from "@/imports/QuảnLyNgườiThamGiaChủSan/d39b48b5799ef482fe64ffc6927e071ad367a241.png";
import pAvatar2 from "@/imports/QuảnLyNgườiThamGiaChủSan/029311f5fed7cbddac8b061fea6d510b5f8abe5d.png";
import pAvatar3 from "@/imports/QuảnLyNgườiThamGiaChủSan/871e6017b45407175f7bf362a914d6dece87ae13.png";
import pAvatar4 from "@/imports/QuảnLyNgườiThamGiaChủSan/871cdcfafcee355ae6e56f8f2cfe8f52d30833a6.png";
import scoreAvatar from "@/imports/ChấmDiểmTheoTieuChiThiếtLậpChủSan/9ec65ba5bc18f95ecf75525499cadae3b8f8dbff.png";
import profileAvatar from "@/imports/HồSơEloHuyHiệuNgườiChơi/e36a60167703f9a6f8c718d731921ccad247e5f5.png";

export { bgTexture, imgCourt, loginSvg, pAvatar1, pAvatar2, pAvatar3, pAvatar4, scoreAvatar, profileAvatar };
export const PLAYER_ID = "player_me";
export const PLAYER_NAME = "Lê Thị Hoa";
export const PLAYER_AVATAR = pAvatar2;
export const OWNER_VENUE = "CLB Thể Thao Phú Mỹ Hưng";

// ─── Types ────────────────────────────────────────────────────────────────────
export type Role = "owner" | "player" | "admin";
export type ApprovalType = "auto" | "manual";
export type SessionStatus = "open" | "in_progress" | "completed" | "cancelled";
export type RegStatus = "pending" | "confirmed" | "rejected";

export type Registration = {
  userId: string;
  name: string;
  avatar: string;
  level: string;
  status: RegStatus;
};

export type Sport = "Cầu lông" | "Tennis" | "Pickleball";

export type Session = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  sport: Sport;
  venueName: string;   // tên sân / câu lạc bộ
  ownerName: string;   // tên chủ sân
  approvalType: ApprovalType;
  status: SessionStatus;
  maxParticipants: number;
  fee: number; // VND, 0 = miễn phí
  scorerName: string; // tên người chấm điểm
  criteriaWeights: Record<string, number>; // criteriaId -> % (sum=100)
  registrations: Registration[];
  scores: Record<string, Record<string, number>>; // userId -> criteriaId -> 1-5
};

export type Screen =
  | "login" | "register"
  | "owner-home" | "owner-sessions" | "session-detail" | "edit-session" | "participants" | "scoring" | "session-results"
  | "create-step1"
  | "owner-matches" | "owner-create-matchmaking" | "owner-matchmaking-detail"
  | "player-home" | "player-my-sessions" | "player-session-detail" | "player-scores"
  | "player-matches" | "player-create-challenge" | "player-challenge-detail" | "player-join-matchmaking" | "player-matchmaking-detail"
  | "leaderboard" | "profile"
  | "admin-dashboard";

// ─── Match types ──────────────────────────────────────────────────────────────
export type ChallengeStatus = "invited" | "confirmed" | "declined" | "completed";
export type ChallengeMatch = {
  id: number;
  sport: Sport;
  format: MatchFormat;
  date: string;
  time: string;
  venueName: string;
  courtBooked: boolean;
  creatorId: string; creatorName: string; creatorAvatar: string;
  inviteeId: string; inviteeName: string; inviteeAvatar: string;
  status: ChallengeStatus;
  result?: { creatorScore: number; inviteeScore: number };
};

export type MatchFormat = "singles" | "doubles";
export type MatchPlayer = { userId: string; name: string; avatar: string };

export type MatchPair = {
  id: number;
  team1: MatchPlayer[]; // 1 người (đơn) hoặc 2 người (đôi)
  team2: MatchPlayer[];
  court: string;
  result?: string;           // e.g. "21-18"
  winner?: "team1" | "team2";
};

export type MatchmakingSession = {
  id: number;
  sport: Sport;
  format: MatchFormat;
  date: string;
  time: string;
  venueName: string;
  ownerName: string;
  numCourts: number;
  maxParticipants: number;
  status: "open" | "matching" | "in_progress" | "completed";
  registrations: { userId: string; name: string; avatar: string; level: string; elo?: number }[];
  matches: MatchPair[];
};

export type Tab = "home" | "sessions" | "leaderboard" | "profile";

// ─── Constants ────────────────────────────────────────────────────────────────
export const CRITERIA = [
  { id: "technical", name: "Kỹ thuật", sub: "Technical Skills", emoji: "🎯" },
  { id: "control", name: "Kiểm soát & Ổn định", sub: "Control & Consistency", emoji: "⚖️" },
  { id: "movement", name: "Di chuyển & Vị trí", sub: "Movement & Positioning", emoji: "🏃" },
  { id: "tactical", name: "Tư duy chiến thuật", sub: "Game Understanding", emoji: "🧠" },
  { id: "match", name: "Hiệu quả thi đấu", sub: "Match Performance", emoji: "🏆" },
];

export const SCORE_LABELS = ["", "Yếu", "Trung bình", "Khá", "Tốt", "Xuất sắc"];
export const SCORE_COLORS = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#006e26"];
export const SCORE_BG = ["", "#fee2e2", "#fef3c7", "#eff6ff", "#dcfce7", "#e8f5ee"];

export const PLAYER_AVATARS = [avatarA, avatarB, avatarC, avatarD, avatarE, pAvatar1, pAvatar2, pAvatar3, pAvatar4];
export const PLAYER_LEVELS = ["Mới bắt đầu", "Trung cấp", "Khá", "Nâng cao", "Chuyên nghiệp"];

export const EQUAL_WEIGHTS = { technical: 20, control: 20, movement: 20, tactical: 20, match: 20 };
export const MIN_PARTICIPANTS = 2; // số người tối thiểu để buổi diễn ra
export const CANCEL_DAYS_BEFORE = 2; // phải hủy trước ít nhất N ngày

// session.date is "YYYY-MM-DD"; returns true if today is > N days before session date
export function canModifySession(session: { date: string; status: SessionStatus }): boolean {
  if (session.status === "in_progress" || session.status === "completed" || session.status === "cancelled") return false;
  const sessionDate = new Date(session.date);
  const now = new Date();
  const diffDays = (sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > CANCEL_DAYS_BEFORE;
}

export function daysUntil(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function computeScore(scores: Record<string, number>, weights: Record<string, number>): number {
  let sum = 0;
  for (const c of CRITERIA) {
    const s = scores[c.id] ?? 0;
    const w = weights[c.id] ?? 20;
    sum += s * (w / 100);
  }
  return sum; // 0–5
}

export function scoreToPercent(score: number): number {
  return Math.round((score / 5) * 100);
}

// Badminton: D C C+ B B+ A A+ Open  (8 bands across 0–5)
export const BADMINTON_LEVELS = [
  { label: "D",    desc: "Mới chơi",                  color: "#9ca3af", bg: "#f3f4f6",  min: 0     },
  { label: "C",    desc: "Chơi giao lưu cơ bản",      color: "#60a5fa", bg: "#eff6ff",  min: 0.625 },
  { label: "C+",   desc: "Chơi phong trào ổn định",   color: "#34d399", bg: "#ecfdf5",  min: 1.25  },
  { label: "B",    desc: "Trình trung cấp",            color: "#fbbf24", bg: "#fffbeb",  min: 1.875 },
  { label: "B+",   desc: "Trình khá",                  color: "#f97316", bg: "#fff7ed",  min: 2.5   },
  { label: "A",    desc: "Thi đấu phong trào mạnh",   color: "#ef4444", bg: "#fef2f2",  min: 3.125 },
  { label: "A+",   desc: "Thi đấu giải mạnh",         color: "#a855f7", bg: "#faf5ff",  min: 3.75  },
  { label: "Open", desc: "Bán chuyên / Chuyên nghiệp", color: "#006e26", bg: "#e8f5ee", min: 4.375 },
];

// Tennis / Pickleball: NTRP-style 1.0–6.0+  (11 bands across 0–5)
export const RACKET_LEVELS = [
  { label: "1.0",  desc: "Người mới hoàn toàn",   color: "#9ca3af", bg: "#f3f4f6",  min: 0     },
  { label: "1.5",  desc: "Mới học cơ bản",         color: "#93c5fd", bg: "#eff6ff",  min: 0.45  },
  { label: "2.0",  desc: "Nắm được luật & kỹ thuật cơ bản", color: "#60a5fa", bg: "#eff6ff", min: 0.9 },
  { label: "2.5",  desc: "Chơi phong trào bắt đầu ổn định", color: "#34d399", bg: "#ecfdf5", min: 1.35 },
  { label: "3.0",  desc: "Phong trào ổn định",     color: "#4ade80", bg: "#f0fdf4",  min: 1.8   },
  { label: "3.5",  desc: "Trung cấp có chiến thuật", color: "#fbbf24", bg: "#fffbeb", min: 2.3  },
  { label: "4.0",  desc: "Trình khá – thi đấu giải nhỏ", color: "#f97316", bg: "#fff7ed", min: 2.9 },
  { label: "4.5",  desc: "Thi đấu giải tỉnh / club", color: "#ef4444", bg: "#fef2f2", min: 3.5  },
  { label: "5.0",  desc: "Giải đấu mạnh",          color: "#e11d48", bg: "#fff1f2",  min: 4.0   },
  { label: "5.5",  desc: "Gần chuyên nghiệp",      color: "#a855f7", bg: "#faf5ff",  min: 4.5   },
  { label: "6.0+", desc: "Chuyên nghiệp",           color: "#006e26", bg: "#e8f5ee", min: 4.8   },
];

export type SkillLevel = { label: string; desc: string; color: string; bg: string };

export function getSkillLevel(score: number, sport: Sport): SkillLevel {
  const table = sport === "Cầu lông" ? BADMINTON_LEVELS : RACKET_LEVELS;
  let result = table[0];
  for (const lvl of table) {
    if (score >= lvl.min) result = lvl;
  }
  return result;
}

export function SkillLevelBadge({ score, sport, large }: { score: number; sport: Sport; large?: boolean }) {
  const lvl = getSkillLevel(score, sport);
  return (
    <div className={`flex items-center gap-${large ? "3" : "2"} rounded-${large ? "2xl" : "xl"} px-${large ? "4" : "2.5"} py-${large ? "3" : "1"}`}
      style={{ background: lvl.bg }}>
      <span className={`font-black ${large ? "text-[28px]" : "text-[15px]"}`} style={{ color: lvl.color, fontFamily: "'JetBrains Mono', monospace" }}>
        {lvl.label}
      </span>
      {large && <div>
        <p className="text-[13px] font-semibold leading-tight" style={{ color: lvl.color }}>{lvl.desc}</p>
        <p className="text-[11px] opacity-70" style={{ color: lvl.color }}>{sport}</p>
      </div>}
    </div>
  );
}

// ─── Seed data ────────────────────────────────────────────────────────────────
export const ME: Registration = { userId: "player_me", name: "Lê Thị Hoa", avatar: pAvatar2, level: "Khá", status: "confirmed" };

export const SEED_PLAYERS: Registration[] = [
  { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", status: "confirmed" },
  { userId: "u2", name: "Nguyễn Hữu Đức", avatar: avatarA, level: "Khá", status: "confirmed" },
  { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3, level: "Trung cấp", status: "confirmed" },
  { userId: "u4", name: "Nguyễn Thu Hà", avatar: pAvatar4, level: "Nâng cao", status: "confirmed" },
  ME,
];

const w1 = { technical: 25, control: 20, movement: 15, tactical: 25, match: 15 };
const w2 = EQUAL_WEIGHTS;

export const INITIAL_SESSIONS: Session[] = [
  {
    id: 1,
    title: "Đánh giá Forehand Mùa Hè",
    description: "Buổi đánh giá trình độ kỹ năng toàn diện cho người chơi trung-cao cấp.",
    date: "2026-08-20", time: "08:00",
    sport: "Cầu lông" as Sport,
    venueName: "CLB Thể Thao Phú Mỹ Hưng", ownerName: "Nguyễn Văn A",
    fee: 50000, scorerName: "Nguyễn Văn A",
    approvalType: "manual", status: "open", maxParticipants: 16,
    criteriaWeights: w1,
    registrations: [
      { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", status: "confirmed" },
      { userId: "u2", name: "Lê Thị Hoa", avatar: pAvatar2, level: "Khá", status: "pending" },
      { userId: "u5", name: "Hoàng Bích Ngọc", avatar: avatarE, level: "Trung cấp", status: "pending" },
    ],
    scores: {},
  },
  {
    id: 2,
    title: "Kiểm tra kỹ năng Pickleball",
    description: "Đánh giá toàn diện dành cho người chơi Pickleball tại câu lạc bộ.",
    date: "2024-07-18", time: "14:00",
    sport: "Pickleball" as Sport,
    venueName: "CLB Thể Thao Phú Mỹ Hưng", ownerName: "Nguyễn Văn A",
    fee: 0, scorerName: "Nguyễn Văn A",
    approvalType: "auto", status: "in_progress", maxParticipants: 10,
    criteriaWeights: w2,
    registrations: SEED_PLAYERS,
    scores: {
      u1: { technical: 5, control: 4, movement: 5, tactical: 4, match: 5 },
      u2: { technical: 4, control: 3, movement: 4, tactical: 3, match: 4 },
      u3: { technical: 2, control: 2, movement: 3, tactical: 2, match: 2 },
      u4: { technical: 4, control: 5, movement: 4, tactical: 4, match: 5 },
      player_me: { technical: 3, control: 4, movement: 3, tactical: 3, match: 4 },
    },
  },
  {
    id: 3,
    title: "Tổng kết Tháng 6",
    description: "Đánh giá cuối kỳ tháng 6 cho toàn bộ hội viên câu lạc bộ.",
    date: "2024-06-30", time: "16:00",
    sport: "Tennis" as Sport,
    venueName: "CLB Thể Thao Phú Mỹ Hưng", ownerName: "Nguyễn Văn A",
    fee: 80000, scorerName: "Trần Hoài Nam",
    approvalType: "auto", status: "completed", maxParticipants: 12,
    criteriaWeights: { technical: 30, control: 25, movement: 15, tactical: 20, match: 10 },
    registrations: SEED_PLAYERS,
    scores: {
      u1: { technical: 5, control: 5, movement: 4, tactical: 5, match: 4 },
      u2: { technical: 4, control: 3, movement: 4, tactical: 3, match: 4 },
      u3: { technical: 3, control: 3, movement: 2, tactical: 2, match: 3 },
      u4: { technical: 4, control: 4, movement: 4, tactical: 4, match: 3 },
      player_me: { technical: 3, control: 3, movement: 3, tactical: 2, match: 3 },
    },
  },
  {
    id: 4,
    title: "Đánh giá Tennis Mùa Thu",
    description: "Buổi đánh giá kỹ năng Tennis cho hội viên câu lạc bộ.",
    date: "2026-08-25", time: "09:00",
    sport: "Tennis" as Sport,
    venueName: "Sân Tennis Quận 7", ownerName: "Trần Thị Bình",
    fee: 60000, scorerName: "Trần Thị Bình",
    approvalType: "auto", status: "open", maxParticipants: 8,
    criteriaWeights: { technical: 20, control: 25, movement: 20, tactical: 20, match: 15 },
    registrations: [
      { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", status: "confirmed" },
      { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3, level: "Trung cấp", status: "confirmed" },
    ],
    scores: {},
  },
  {
    id: 5,
    title: "Tổng kết Pickleball Tháng 7",
    description: "Đánh giá cuối tháng cho người chơi Pickleball tại sân.",
    date: "2024-07-10", time: "15:00",
    sport: "Pickleball" as Sport,
    venueName: "Sân Tennis Quận 7", ownerName: "Trần Thị Bình",
    fee: 0, scorerName: "Lê Minh Tuấn",
    approvalType: "auto", status: "completed", maxParticipants: 10,
    criteriaWeights: EQUAL_WEIGHTS,
    registrations: [
      { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", status: "confirmed" },
      { userId: "u4", name: "Nguyễn Thu Hà", avatar: pAvatar4, level: "Nâng cao", status: "confirmed" },
      { userId: "u2", name: "Nguyễn Hữu Đức", avatar: avatarA, level: "Khá", status: "confirmed" },
      ME,
    ],
    scores: {
      u1: { technical: 4, control: 5, movement: 4, tactical: 4, match: 5 },
      u4: { technical: 5, control: 4, movement: 5, tactical: 5, match: 4 },
      u2: { technical: 3, control: 4, movement: 3, tactical: 3, match: 3 },
      player_me: { technical: 4, control: 3, movement: 4, tactical: 3, match: 4 },
    },
  },
  {
    id: 6,
    title: "Đánh giá Cầu lông Cuối Kỳ",
    description: "Buổi đánh giá tổng kết kỹ năng cầu lông cho hội viên câu lạc bộ.",
    date: "2024-06-15", time: "07:30",
    sport: "Cầu lông" as Sport,
    venueName: "Sân Tennis Quận 7", ownerName: "Trần Thị Bình",
    fee: 40000, scorerName: "Trần Thị Bình",
    approvalType: "auto", status: "completed", maxParticipants: 12,
    criteriaWeights: w1,
    registrations: [
      { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", status: "confirmed" },
      { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3, level: "Trung cấp", status: "confirmed" },
      { userId: "u4", name: "Nguyễn Thu Hà", avatar: pAvatar4, level: "Nâng cao", status: "confirmed" },
      ME,
    ],
    scores: {
      u1: { technical: 5, control: 4, movement: 5, tactical: 5, match: 4 },
      u3: { technical: 2, control: 3, movement: 2, tactical: 2, match: 2 },
      u4: { technical: 4, control: 4, movement: 4, tactical: 5, match: 4 },
      player_me: { technical: 4, control: 4, movement: 3, tactical: 3, match: 4 },
    },
  },
];

// ─── Match seed data ──────────────────────────────────────────────────────────
export const INITIAL_CHALLENGES: ChallengeMatch[] = [
  {
    id: 101, sport: "Cầu lông", format: "singles", date: "2026-08-18", time: "09:00",
    venueName: "CLB Thể Thao Phú Mỹ Hưng", courtBooked: true,
    creatorId: "player_me", creatorName: "Lê Thị Hoa", creatorAvatar: pAvatar2,
    inviteeId: "u1", inviteeName: "Trần Minh Khoa", inviteeAvatar: pAvatar1,
    status: "confirmed",
  },
  {
    id: 102, sport: "Pickleball", format: "doubles", date: "2026-08-22", time: "14:00",
    venueName: "Sân Tennis Quận 7", courtBooked: true,
    creatorId: "u4", creatorName: "Nguyễn Thu Hà", creatorAvatar: pAvatar4,
    inviteeId: "player_me", inviteeName: "Lê Thị Hoa", inviteeAvatar: pAvatar2,
    status: "invited",
  },
  {
    id: 103, sport: "Tennis", format: "singles", date: "2026-07-30", time: "08:00",
    venueName: "CLB Thể Thao Phú Mỹ Hưng", courtBooked: true,
    creatorId: "player_me", creatorName: "Lê Thị Hoa", creatorAvatar: pAvatar2,
    inviteeId: "u3", inviteeName: "Phạm Văn Nam", inviteeAvatar: pAvatar3,
    status: "completed", result: { creatorScore: 21, inviteeScore: 15 },
  },
];

export const INITIAL_MATCHMAKING: MatchmakingSession[] = [
  {
    id: 201, sport: "Cầu lông", format: "singles", date: "2026-08-24", time: "07:30",
    venueName: "CLB Thể Thao Phú Mỹ Hưng", ownerName: "Nguyễn Văn A",
    numCourts: 3, maxParticipants: 8, status: "open",
    registrations: [
      { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", elo: 1820 },
      { userId: "player_me", name: "Lê Thị Hoa", avatar: pAvatar2, level: "Khá", elo: 1550 },
      { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3, level: "Trung cấp", elo: 1320 },
    ],
    matches: [],
  },
  {
    id: 202, sport: "Pickleball", format: "doubles", date: "2026-08-19", time: "15:00",
    venueName: "CLB Thể Thao Phú Mỹ Hưng", ownerName: "Nguyễn Văn A",
    numCourts: 2, maxParticipants: 8, status: "in_progress",
    registrations: [
      { userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1, level: "Nâng cao", elo: 1820 },
      { userId: "u4", name: "Nguyễn Thu Hà", avatar: pAvatar4, level: "Nâng cao", elo: 1710 },
      { userId: "player_me", name: "Lê Thị Hoa", avatar: pAvatar2, level: "Khá", elo: 1550 },
      { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3, level: "Trung cấp", elo: 1320 },
    ],
    matches: [
      {
        id: 1, court: "Sân 1", result: "21-18", winner: "team1",
        team1: [{ userId: "u1", name: "Trần Minh Khoa", avatar: pAvatar1 }, { userId: "player_me", name: "Lê Thị Hoa", avatar: pAvatar2 }],
        team2: [{ userId: "u4", name: "Nguyễn Thu Hà", avatar: pAvatar4 }, { userId: "u3", name: "Phạm Văn Nam", avatar: pAvatar3 }],
      },
    ],
  },
];

// ─── Design tokens ────────────────────────────────────────────────────────────
export const G = "#006e26";
export const F = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
export const M = "'JetBrains Mono', monospace";

// ─── Shared UI ────────────────────────────────────────────────────────────────
export function Logo({ size = 32 }: { size?: number }) {
  return <img src={logoImg} alt="ALOBO" style={{ width: size, height: size, borderRadius: size * 0.28, display: "block" }} />;
}

export function IOSInput({ label, placeholder, type = "text", value, onChange, right }: {
  label?: string; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>{label}</p>}
      <div className="relative bg-white rounded-xl border border-[#e5ebe4] focus-within:border-[#006e26] transition-colors">
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent px-4 py-3.5 text-[15px] text-[#1a1a1a] placeholder-[#c0cdbf] outline-none"
          style={{ fontFamily: F }} />
        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
    </div>
  );
}

export function IOSTextarea({ label, placeholder, value, onChange }: {
  label?: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e9c8d] px-1" style={{ fontFamily: M }}>{label}</p>}
      <textarea placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} rows={3}
        className="bg-white rounded-xl border border-[#e5ebe4] focus:border-[#006e26] px-4 py-3.5 text-[15px] text-[#1a1a1a] placeholder-[#c0cdbf] outline-none resize-none transition-colors"
        style={{ fontFamily: F }} />
    </div>
  );
}

export function Btn({ children, onClick, variant = "primary", disabled, small }: {
  children: React.ReactNode; onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "amber"; disabled?: boolean; small?: boolean;
}) {
  const s = {
    primary: "bg-[#006e26] text-white shadow-[0_4px_14px_rgba(0,110,38,0.25)]",
    ghost: "bg-white border border-[#d8e6d7] text-[#1a1a1a]",
    danger: "bg-[#fee2e2] text-[#dc2626]",
    amber: "bg-[#fef3c7] text-[#92400e]",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${small ? "px-4 py-2 text-[13px] rounded-xl" : "w-full py-4 text-[15px] rounded-2xl"} font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-40 ${s[variant]}`}
      style={{ fontFamily: F }}>
      {children}
    </button>
  );
}

export function BackBtn({ onClick, label = "Quay lại", light }: { onClick: () => void; label?: string; light?: boolean }) {
  const color = light ? "white" : "#006e26";
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-[15px] font-semibold" style={{ fontFamily: F, color }}>
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
        <path d="M8 1L1.5 7.5L8 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  );
}

export function StatusDot({ status }: { status: SessionStatus }) {
  const c = { open: "#22c55e", in_progress: "#f59e0b", completed: "#6b7280", cancelled: "#dc2626" };
  const l = { open: "Đang mở", in_progress: "Đang diễn ra", completed: "Đã kết thúc", cancelled: "Đã hủy" };
  return (
    <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: c[status], fontFamily: F }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c[status] }} />
      {l[status]}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const idx = Math.min(5, Math.max(0, Math.round(score)));
  return (
    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: SCORE_BG[idx], color: SCORE_COLORS[idx], fontFamily: M }}>
      {SCORE_LABELS[idx] || "–"}
    </span>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
export function TabBar({ active, role, onSelect }: { active: Tab; role: Role; onSelect: (t: Tab) => void }) {
  const ownerTabs = [
    { id: "home" as Tab, label: "Trang chủ", icon: (a: boolean) => <HomeIcon active={a} /> },
    { id: "sessions" as Tab, label: "Thi đấu", icon: (a: boolean) => <CalendarIcon active={a} /> },
    { id: "leaderboard" as Tab, label: "Xếp hạng", icon: (a: boolean) => <TrophyIcon active={a} /> },
    { id: "profile" as Tab, label: "Hồ sơ", icon: (a: boolean) => <UserIcon active={a} /> },
  ];
  const playerTabs = [
    { id: "home" as Tab, label: "Khám phá", icon: (a: boolean) => <HomeIcon active={a} /> },
    { id: "sessions" as Tab, label: "Thi đấu", icon: (a: boolean) => <CalendarIcon active={a} /> },
    { id: "leaderboard" as Tab, label: "Xếp hạng", icon: (a: boolean) => <TrophyIcon active={a} /> },
    { id: "profile" as Tab, label: "Hồ sơ", icon: (a: boolean) => <UserIcon active={a} /> },
  ];
  const tabs = role === "owner" ? ownerTabs : playerTabs;
  return (
    <div className="flex items-center justify-around bg-white/95 backdrop-blur-sm border-t border-[#eef2ec]" style={{ height: 64, paddingBottom: 4 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} className="flex flex-col items-center gap-1 flex-1 pt-2">
          {t.icon(active === t.id)}
          <span className="text-[10px] font-medium" style={{ fontFamily: F, color: active === t.id ? G : "#a0a8a0" }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

export function HomeIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
      fill={active ? G : "none"} stroke={active ? G : "#b0b8b0"} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>;
}
export function CalendarIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke={active ? G : "#b0b8b0"} strokeWidth="1.8" fill={active ? "#e8f5ee" : "none"} />
    <path d="M16 2V6M8 2V6M3 10H21M8 14H10M14 14H16M8 18H10" stroke={active ? G : "#b0b8b0"} strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}
export function TrophyIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={active ? G : "none"} stroke={active ? G : "#b0b8b0"} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>;
}
export function UserIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={active ? G : "none"} stroke={active ? G : "#b0b8b0"} strokeWidth="1.8" />
    <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20" stroke={active ? G : "#b0b8b0"} strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}

