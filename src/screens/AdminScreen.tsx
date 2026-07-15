import { useState } from "react";
import { F, M, G, type Session, type Sport, computeScore, getSkillLevel, CRITERIA, SCORE_COLORS, SCORE_LABELS } from "../app/shared";

type AdminView = "dashboard" | "trust" | "assessments";

type Evidence = {
  id: string;
  label: string;
  type: "court" | "business" | "skill" | "bank" | "community";
  status: "uploaded" | "missing" | "verified";
};

type CourtTrustCase = {
  id: number;
  courtName: string;
  ownerName: string;
  trustScore: number;
  status: "pending" | "verified" | "rejected";
  monthlyPlayers: number[];
  monthlySessions: number[];
  cancellationRate: number;
  complaintRate: number;
  operatingMonths: number;
  evidence: Evidence[];
};

const trustCases: CourtTrustCase[] = [
  {
    id: 1,
    courtName: "CLB Thể Thao Phú Mỹ Hưng",
    ownerName: "Nguyễn Văn A",
    trustScore: 0.43,
    status: "pending",
    monthlyPlayers: [92, 118, 136, 152, 171, 188],
    monthlySessions: [18, 22, 25, 28, 31, 34],
    cancellationRate: 1.8,
    complaintRate: 0.6,
    operatingMonths: 18,
    evidence: [
      { id: "business", label: "Giấy phép kinh doanh", type: "business", status: "uploaded" },
      { id: "court-img", label: "Hình ảnh sân", type: "court", status: "uploaded" },
      { id: "coach", label: "Chứng chỉ huấn luyện", type: "skill", status: "uploaded" },
      { id: "referee", label: "Chứng chỉ trọng tài", type: "skill", status: "missing" },
      { id: "bank", label: "Tài khoản ngân hàng", type: "bank", status: "uploaded" },
      { id: "maps", label: "Google Maps / Fanpage", type: "community", status: "uploaded" },
    ],
  },
  {
    id: 2,
    courtName: "ABC Badminton",
    ownerName: "Trần Minh Khoa",
    trustScore: 0.72,
    status: "verified",
    monthlyPlayers: [140, 160, 176, 180, 196, 210],
    monthlySessions: [26, 30, 31, 34, 37, 40],
    cancellationRate: 0.9,
    complaintRate: 0.2,
    operatingMonths: 26,
    evidence: [
      { id: "business", label: "Giấy phép kinh doanh", type: "business", status: "verified" },
      { id: "court-img", label: "Hình ảnh sân", type: "court", status: "verified" },
      { id: "coach", label: "Chứng chỉ huấn luyện", type: "skill", status: "verified" },
    ],
  },
  {
    id: 3,
    courtName: "XYZ Tennis Center",
    ownerName: "Lê Quốc Bảo",
    trustScore: 0.31,
    status: "pending",
    monthlyPlayers: [40, 55, 51, 67, 64, 70],
    monthlySessions: [8, 9, 9, 11, 10, 12],
    cancellationRate: 5.4,
    complaintRate: 2.1,
    operatingMonths: 7,
    evidence: [
      { id: "court-img", label: "Hình ảnh sân", type: "court", status: "uploaded" },
      { id: "coach", label: "Chứng chỉ huấn luyện", type: "skill", status: "missing" },
      { id: "bank", label: "Tài khoản ngân hàng", type: "bank", status: "uploaded" },
    ],
  },
];

const pct = (n: number) => `${Math.round(n * 100)}%`;
const months = ["T1", "T2", "T3", "T4", "T5", "T6"];

function TrustBadge({ score }: { score: number }) {
  const bg = score > 0.8 ? "#e8f5ee" : score > 0.5 ? "#fffbeb" : "#fef2f2";
  const color = score > 0.8 ? G : score > 0.5 ? "#b45309" : "#dc2626";
  const label = score > 0.8 ? "Rất tin cậy" : score > 0.5 ? "Đủ tin cậy" : "Cần duyệt";
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold" style={{ background: bg, color, fontFamily: F }}>
      <span>{score.toFixed(2)}</span>
      <span className="opacity-70">{label}</span>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-[#e6eee5] rounded-3xl shadow-sm ${className}`}>{children}</div>;
}

function MiniChart({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-2 h-28 pt-4">
      {values.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full rounded-t-xl bg-[#006e26]/80" style={{ height: `${Math.max(16, (v / max) * 92)}px` }} />
          <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: M }}>{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

function AdminSidebar({ view, setView, onLogout }: { view: AdminView; setView: (v: AdminView) => void; onLogout: () => void }) {
  const items = [
    { id: "dashboard" as AdminView, label: "Dashboard", icon: "📊" },
    { id: "trust" as AdminView, label: "Xác thực Trust Score", icon: "🛡️" },
    { id: "assessments" as AdminView, label: "Kiểm duyệt đánh giá", icon: "✅" },
  ];
  return (
    <aside className="w-72 bg-white border-r border-[#e6eee5] min-h-screen px-5 py-6 flex flex-col">
      <div className="mb-8">
        <p className="text-[12px] uppercase tracking-[0.3em] text-[#7a8a79]" style={{ fontFamily: M }}>ALOBO</p>
        <h1 className="text-[24px] font-black text-[#1a1a1a] mt-1" style={{ fontFamily: F }}>Admin Web</h1>
      </div>
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`text-left px-4 py-3 rounded-2xl font-semibold flex items-center gap-3 ${view === item.id ? "bg-[#e8f5ee] text-[#006e26]" : "text-[#5a6a59] hover:bg-[#f6f9f6]"}`}
            style={{ fontFamily: F }}
          >
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t border-[#eef2ec]">
        <button onClick={onLogout} className="w-full px-4 py-3 rounded-2xl bg-[#f6f9f6] text-[#5a6a59] font-semibold" style={{ fontFamily: F }}>Đăng xuất</button>
      </div>
    </aside>
  );
}

function Dashboard({ sessions }: { sessions: Session[] }) {
  const pendingAssessments = sessions.filter(s => (s.status === "completed" || Object.keys(s.scores).length > 0)).length;
  const totalMatches = sessions.reduce((total, session) => {
    const confirmedPlayers = session.registrations.filter(r => r.status === "confirmed").length;
    return total + Math.max(0, Math.floor(confirmedPlayers / 2));
  }, 0);
  const uniquePlayerIds = new Set(sessions.flatMap(session => session.registrations.map(registration => registration.userId)));
  const uniqueOwners = new Set([
    ...trustCases.map(court => court.ownerName),
    ...sessions.map(session => session.ownerName).filter(Boolean),
  ]);

  const cards = [
    { label: "Chờ xác thực sân", value: trustCases.filter(c => c.status === "pending").length, sub: "Trust Score" },
    { label: "Chờ duyệt đánh giá", value: pendingAssessments, sub: "Trust ≤ 0.5" },
    { label: "Sân đã xác thực", value: trustCases.filter(c => c.status === "verified").length, sub: "Verified" },
    { label: "Tổng số trận đấu được ghi nhận", value: totalMatches, sub: "Toàn hệ thống" },
    { label: "Tổng số người chơi", value: uniquePlayerIds.size || 2486, sub: "Tài khoản vận động viên" },
    { label: "Tổng số chủ sân", value: uniqueOwners.size || trustCases.length, sub: "Tài khoản chủ sân" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>Dashboard kiểm duyệt</h2>
        <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Theo dõi hoạt động và quy mô của hệ thống ALOBO.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cards.map(c => (
          <Card key={c.label} className="p-5">
            <p className="text-[13px] text-[#7a8a79]" style={{ fontFamily: F }}>{c.label}</p>
            <p className="text-[32px] font-black text-[#006e26] mt-2" style={{ fontFamily: M }}>{c.value}</p>
            <p className="text-[12px] text-[#9aaa99] mt-1" style={{ fontFamily: F }}>{c.sub}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Card className="p-5">
          <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Số người chơi theo tháng</p>
          <MiniChart values={trustCases[0].monthlyPlayers} />
        </Card>
        <Card className="p-5">
          <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Số buổi đánh giá theo tháng</p>
          <MiniChart values={trustCases[0].monthlySessions} />
        </Card>
      </div>
    </div>
  );
}

type ManagedPlayer = {
  id: string;
  name: string;
  sport: Sport;
  elo: number;
  level: string;
};

const INITIAL_MANAGED_PLAYERS: ManagedPlayer[] = [
  { id: "player-01", name: "Nguyễn Minh Anh", sport: "Pickleball", elo: 1460, level: "3.5" },
  { id: "player-02", name: "Trần Gia Huy", sport: "Cầu lông", elo: 1320, level: "B" },
  { id: "player-03", name: "Lê Hoàng Nam", sport: "Tennis", elo: 1580, level: "4.0" },
  { id: "player-04", name: "Phạm Khánh Linh", sport: "Pickleball", elo: 1210, level: "3.0" },
];

function TrustVerification() {
  const rankedCourts = [...trustCases].sort((a, b) => b.trustScore - a.trustScore);
  const [selectedCourtId, setSelectedCourtId] = useState(rankedCourts[0].id);
  const [assessmentPermissions, setAssessmentPermissions] = useState<Record<number, boolean>>(
    Object.fromEntries(trustCases.map(court => [court.id, true]))
  );
  const [players, setPlayers] = useState<ManagedPlayer[]>(INITIAL_MANAGED_PLAYERS);
  const [selectedPlayerId, setSelectedPlayerId] = useState(INITIAL_MANAGED_PLAYERS[0].id);

  const selectedCourt = rankedCourts.find(court => court.id === selectedCourtId) ?? rankedCourts[0];
  const selectedPlayer = players.find(player => player.id === selectedPlayerId) ?? players[0];
  const assessmentEnabled = assessmentPermissions[selectedCourt.id] !== false;

  const toggleAssessmentPermission = () => {
    setAssessmentPermissions(prev => ({ ...prev, [selectedCourt.id]: !assessmentEnabled }));
  };

  const resetPlayerElo = () => {
    setPlayers(prev => prev.map(player => (
      player.id === selectedPlayer.id ? { ...player, elo: 1000, level: "Chưa xếp hạng" } : player
    )));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>Bảng xếp hạng Trust Score</h2>
        <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Theo dõi thứ hạng sân và quản lý quyền tạo Assessment của chủ sân.</p>
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-5">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[0.35fr_1.3fr_0.9fr_0.65fr_0.85fr] px-5 py-3 bg-[#f6f9f6] text-[12px] font-bold text-[#7a8a79]" style={{ fontFamily: M }}>
            <span>Hạng</span><span>Sân</span><span>Chủ sân</span><span>Trust</span><span>Quyền Assessment</span>
          </div>
          {rankedCourts.map((court, index) => {
            const enabled = assessmentPermissions[court.id] !== false;
            return (
              <button
                key={court.id}
                onClick={() => setSelectedCourtId(court.id)}
                className={`w-full grid grid-cols-[0.35fr_1.3fr_0.9fr_0.65fr_0.85fr] items-center px-5 py-4 border-t border-[#eef2ec] text-left ${selectedCourt.id === court.id ? "bg-[#e8f5ee]/60" : "bg-white"}`}
              >
                <span className="font-black text-[#006e26]" style={{ fontFamily: M }}>#{index + 1}</span>
                <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{court.courtName}</span>
                <span className="text-[#5a6a59]" style={{ fontFamily: F }}>{court.ownerName}</span>
                <span className="font-black text-[#006e26]" style={{ fontFamily: M }}>{court.trustScore.toFixed(2)}</span>
                <span className={`text-[12px] font-bold ${enabled ? "text-[#006e26]" : "text-[#dc2626]"}`} style={{ fontFamily: F }}>
                  {enabled ? "Đang mở" : "Đã khóa"}
                </span>
              </button>
            );
          })}
        </Card>

        <Card className="p-5 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-[#7a8a79]" style={{ fontFamily: M }}>Quản lý chủ sân</p>
              <h3 className="text-[22px] font-black text-[#1a1a1a] mt-1" style={{ fontFamily: F }}>{selectedCourt.courtName}</h3>
              <p className="text-[#7a8a79]" style={{ fontFamily: F }}>{selectedCourt.ownerName}</p>
            </div>
            <TrustBadge score={selectedCourt.trustScore} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Người chơi/tháng", value: selectedCourt.monthlyPlayers.at(-1) },
              { label: "Buổi đánh giá", value: selectedCourt.monthlySessions.reduce((a, b) => a + b, 0) },
              { label: "Tháng hoạt động", value: selectedCourt.operatingMonths },
            ].map(item => (
              <div key={item.label} className="bg-[#f6f9f6] rounded-2xl p-3">
                <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{item.label}</p>
                <p className="text-[20px] font-black text-[#006e26] mt-1" style={{ fontFamily: M }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#e6eee5] p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Quyền tạo Assessment</p>
              <p className="text-[12px] text-[#7a8a79] mt-1" style={{ fontFamily: F }}>
                {assessmentEnabled ? "Chủ sân hiện có thể tạo buổi đánh giá." : "Chủ sân đang bị khóa quyền tạo buổi đánh giá."}
              </p>
            </div>
            <button
              onClick={toggleAssessmentPermission}
              className={`px-4 py-3 rounded-2xl font-bold ${assessmentEnabled ? "bg-[#fee2e2] text-[#dc2626]" : "bg-[#006e26] text-white"}`}
              style={{ fontFamily: F }}
            >
              {assessmentEnabled ? "Khóa quyền" : "Mở quyền"}
            </button>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[20px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>Quản lý ELO vận động viên</h3>
            <p className="text-[12px] text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Chọn vận động viên để đưa ELO về mức mặc định 1000.</p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_0.75fr] gap-5">
          <div className="rounded-3xl border border-[#e6eee5] overflow-hidden">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.55fr_0.55fr] px-4 py-3 bg-[#f6f9f6] text-[12px] font-bold text-[#7a8a79]" style={{ fontFamily: M }}>
              <span>Vận động viên</span><span>Môn</span><span>Trình</span><span>ELO</span>
            </div>
            {players.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)}
                className={`w-full grid grid-cols-[1.2fr_0.7fr_0.55fr_0.55fr] items-center px-4 py-3 border-t border-[#eef2ec] text-left ${selectedPlayer.id === player.id ? "bg-[#e8f5ee]/70" : "bg-white"}`}
              >
                <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{player.name}</span>
                <span className="text-[#5a6a59]" style={{ fontFamily: F }}>{player.sport}</span>
                <span className="font-bold text-[#006e26]" style={{ fontFamily: M }}>{player.level}</span>
                <span className="font-black text-[#1a1a1a]" style={{ fontFamily: M }}>{player.elo}</span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-[#f6f9f6] p-5 flex flex-col justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-[#7a8a79]" style={{ fontFamily: M }}>Vận động viên đã chọn</p>
              <p className="text-[22px] font-black text-[#1a1a1a] mt-2" style={{ fontFamily: F }}>{selectedPlayer.name}</p>
              <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>{selectedPlayer.sport} · Trình {selectedPlayer.level}</p>
              <p className="text-[42px] font-black text-[#006e26] mt-5" style={{ fontFamily: M }}>{selectedPlayer.elo}</p>
              <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>ELO hiện tại</p>
            </div>
            <button onClick={resetPlayerElo} className="w-full mt-5 py-3 rounded-2xl bg-[#fee2e2] text-[#dc2626] font-bold" style={{ fontFamily: F }}>
              Reset ELO về 1000
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function getOwnerTrustForSession(session: Session) {
  if (session.venueName.includes("Phú Mỹ Hưng")) return 0.43;
  if (session.venueName.includes("ABC")) return 0.72;
  if (session.venueName.includes("XYZ")) return 0.31;
  return session.approvalType === "auto" ? 0.68 : 0.38;
}

const SPORT_SCALE_DESCRIPTIONS: Record<Sport, Record<string, string>> = {
  "Pickleball": {
    "1.0": "Mới làm quen môn",
    "2.0": "Biết luật cơ bản",
    "2.5": "Chơi giao lưu cơ bản",
    "3.0": "Duy trì rally, có Dink cơ bản",
    "3.5": "Dink và chiến thuật khá",
    "4.0": "Third Shot Drop ổn định",
    "4.5": "Thi đấu phong trào trình cao",
    "5.0": "Thi đấu giải mạnh",
    "5.5+": "Bán chuyên",
    "6.0+": "Chuyên nghiệp",
  },
  "Tennis": {
    "1.0": "Mới bắt đầu",
    "1.5": "Mới học",
    "2.0": "Chơi cơ bản",
    "2.5": "Rally ngắn",
    "3.0": "Chơi phong trào",
    "3.5": "Trình trung cấp",
    "4.0": "Thi đấu phong trào khá",
    "4.5": "Thi đấu mạnh",
    "5.0": "Thi đấu cấp cao",
    "5.5": "Bán chuyên",
    "6.0+": "Chuyên nghiệp",
  },
  "Cầu lông": {
    "D": "Mới chơi",
    "C": "Chơi giao lưu cơ bản",
    "C+": "Chơi phong trào ổn định",
    "B": "Trình trung cấp",
    "B+": "Trình khá",
    "A": "Thi đấu phong trào mạnh",
    "A+": "Thi đấu giải mạnh",
    "Open": "Bán chuyên/Chuyên nghiệp",
  },
};

function getSportScaleValue(score: number, sport: Sport) {
  if (sport === "Pickleball") {
    if (score < 1.5) return "1.0";
    if (score < 2.25) return "2.0";
    if (score < 2.75) return "2.5";
    if (score < 3.25) return "3.0";
    if (score < 3.75) return "3.5";
    if (score < 4.25) return "4.0";
    if (score < 4.75) return "4.5";
    return "5.0";
  }
  if (sport === "Tennis") {
    if (score < 1.25) return "1.0";
    if (score < 1.75) return "1.5";
    if (score < 2.25) return "2.0";
    if (score < 2.75) return "2.5";
    if (score < 3.25) return "3.0";
    if (score < 3.75) return "3.5";
    if (score < 4.25) return "4.0";
    if (score < 4.75) return "4.5";
    return "5.0";
  }
  if (score < 1.75) return "D";
  if (score < 2.25) return "C";
  if (score < 2.75) return "C+";
  if (score < 3.25) return "B";
  if (score < 3.75) return "B+";
  if (score < 4.25) return "A";
  if (score < 4.75) return "A+";
  return "Open";
}

function getSportScaleResult(score: number, sport: Sport) {
  const value = getSportScaleValue(score, sport);
  return {
    value,
    desc: SPORT_SCALE_DESCRIPTIONS[sport][value] ?? "Đã quy đổi theo thang điểm bộ môn",
  };
}

function estimateElo(score: number) {
  return Math.round(600 + ((score - 1) / 4) * 1400);
}

type PlayerProfileData = {
  currentElo: number;
  winRate: number;
  eloHistory: number[];
  recentMatches: Array<{ opponent: string; result: "Thắng" | "Thua"; score: string; eloChange: number }>;
  previousAssessments: Array<{ title: string; date: string; level: string; venue: string }>;
};

function buildPlayerProfile(playerName: string, currentElo: number, level: string, venue: string): PlayerProfileData {
  return {
    currentElo,
    winRate: 64,
    eloHistory: [currentElo - 95, currentElo - 62, currentElo - 70, currentElo - 28, currentElo - 12, currentElo],
    recentMatches: [
      { opponent: "Trần Quốc Bảo", result: "Thắng", score: "2–0", eloChange: 18 },
      { opponent: "Nguyễn Minh Khang", result: "Thua", score: "1–2", eloChange: -12 },
      { opponent: "Lê Tuấn Anh", result: "Thắng", score: "2–1", eloChange: 16 },
    ],
    previousAssessments: [
      { title: "Đánh giá định kỳ tháng 05", date: "18/05/2026", level, venue },
      { title: "Đánh giá đầu mùa", date: "12/02/2026", level, venue: "ALOBO Sports Center" },
    ],
  };
}

function AssessmentReview({ sessions }: { sessions: Session[] }) {
  const completed = sessions.filter(s => Object.keys(s.scores).length > 0 || s.status === "completed");
  const sourceSessions = completed.length > 0 ? completed : sessions;
  const [selectedId, setSelectedId] = useState<number>(sourceSessions[0]?.id ?? 1);
  const [decisionBySession, setDecisionBySession] = useState<Record<number, "approved" | "rejected" | "rescore">>({});
  const selected = sourceSessions.find(s => s.id === selectedId) ?? sourceSessions[0];
  const trust = getOwnerTrustForSession(selected);
  const needReview = trust <= 0.5;
  const decision = decisionBySession[selected.id];

  const scoredPlayers = selected.registrations
    .filter(r => selected.scores[r.userId])
    .map(r => {
      const weighted = computeScore(selected.scores[r.userId], selected.criteriaWeights);
      const scale = getSportScaleResult(weighted, selected.sport);
      return { ...r, weighted, scale, elo: estimateElo(weighted) };
    });

  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(scoredPlayers[0]?.userId ?? "");
  const activePlayer = scoredPlayers.find(p => p.userId === selectedPlayerId) ?? scoredPlayers[0];
  const activeProfile = activePlayer
    ? buildPlayerProfile(activePlayer.name, activePlayer.elo, activePlayer.scale.value, selected.venueName)
    : null;

  const handleSelectSession = (id: number) => {
    const next = sourceSessions.find(s => s.id === id);
    setSelectedId(id);
    const firstPlayer = next?.registrations.find(r => next.scores[r.userId]);
    setSelectedPlayerId(firstPlayer?.userId ?? "");
  };

  const decisionLabel = decision === "approved" ? "Đã chấp nhận" : decision === "rejected" ? "Đã từ chối" : decision === "rescore" ? "Đã yêu cầu chấm lại" : "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>Kiểm duyệt kết quả đánh giá</h2>
        <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Kiểm tra kết quả Assessment và hồ sơ của từng người chơi tham gia.</p>
      </div>

      <div className="grid grid-cols-[0.95fr_1.25fr] gap-5">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1.3fr_0.6fr_0.7fr_0.9fr] px-5 py-3 bg-[#f6f9f6] text-[12px] font-bold text-[#7a8a79]" style={{ fontFamily: M }}>
            <span>Buổi đánh giá</span><span>Môn</span><span>Trust</span><span>Trạng thái</span>
          </div>
          {sourceSessions.slice(0, 8).map(s => {
            const t = getOwnerTrustForSession(s);
            const itemDecision = decisionBySession[s.id];
            return (
              <button key={s.id} onClick={() => handleSelectSession(s.id)} className={`w-full grid grid-cols-[1.3fr_0.6fr_0.7fr_0.9fr] items-center px-5 py-4 border-t border-[#eef2ec] text-left ${selectedId === s.id ? "bg-[#e8f5ee]/60" : "bg-white"}`}>
                <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{s.title}</span>
                <span className="text-[#5a6a59]" style={{ fontFamily: F }}>{s.sport}</span>
                <span className="font-black" style={{ fontFamily: M, color: t > 0.5 ? G : "#dc2626" }}>{t.toFixed(2)}</span>
                <span className="text-[12px] font-bold" style={{ fontFamily: F }}>
                  {itemDecision === "approved" ? "Đã chấp nhận" : itemDecision === "rejected" ? "Đã từ chối" : itemDecision === "rescore" ? "Yêu cầu chấm lại" : t > 0.5 ? "Tự động duyệt" : "Cần Admin duyệt"}
                </span>
              </button>
            );
          })}
        </Card>

        <Card className="p-5 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-[#7a8a79]" style={{ fontFamily: M }}>Chi tiết kiểm duyệt</p>
              <h3 className="text-[22px] font-black text-[#1a1a1a] mt-1" style={{ fontFamily: F }}>{selected.title}</h3>
              <p className="text-[#7a8a79]" style={{ fontFamily: F }}>{selected.venueName} · {selected.date}</p>
            </div>
            <div className="text-right">
              <TrustBadge score={trust} />
              <p className={`text-[12px] mt-2 font-bold ${decision ? "text-[#006e26]" : needReview ? "text-[#dc2626]" : "text-[#006e26]"}`} style={{ fontFamily: F }}>
                {decision ? decisionLabel : needReview ? "Cần Admin duyệt" : "Tự động duyệt"}
              </p>
            </div>
          </div>

          <div className="bg-[#f6f9f6] rounded-3xl p-4">
            <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>Người chấm</p>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="font-black text-[#1a1a1a]" style={{ fontFamily: F }}>{selected.scorerName}</p>
                <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>Trust Score: {trust.toFixed(2)} · 48 buổi đã chấm · 94% được duyệt</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-white border border-[#dfe9df] text-[#006e26] text-[13px] font-bold" style={{ fontFamily: F }}>Xem chứng chỉ</button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Danh sách người tham gia đã được chấm điểm</p>
              <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>{scoredPlayers.length} người</p>
            </div>

            <div className="rounded-3xl border border-[#e6eee5] overflow-hidden">
              <div className="grid grid-cols-[1.25fr_0.55fr_1.15fr_0.5fr] px-4 py-3 bg-[#f6f9f6] text-[12px] font-bold text-[#7a8a79]" style={{ fontFamily: M }}>
                <span>Người tham gia</span><span>Trình</span><span>Mô tả</span><span>Hồ sơ</span>
              </div>
              {scoredPlayers.length === 0 ? (
                <div className="px-4 py-5 text-[#7a8a79]" style={{ fontFamily: F }}>Chưa có danh sách điểm cho buổi này.</div>
              ) : scoredPlayers.map(player => (
                <button
                  key={player.userId}
                  onClick={() => setSelectedPlayerId(player.userId)}
                  className={`w-full grid grid-cols-[1.25fr_0.55fr_1.15fr_0.5fr] items-center px-4 py-3 border-t border-[#eef2ec] text-left ${activePlayer?.userId === player.userId ? "bg-[#e8f5ee]/70" : "bg-white"}`}
                >
                  <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{player.name}</span>
                  <span className="font-black text-[#006e26]" style={{ fontFamily: M }}>{player.scale.value}</span>
                  <span className="text-[13px] text-[#5a6a59]" style={{ fontFamily: F }}>{player.scale.desc}</span>
                  <span className="text-[12px] font-bold text-[#006e26]" style={{ fontFamily: F }}>Xem profile</span>
                </button>
              ))}
            </div>
          </div>

          {activePlayer && activeProfile && (
            <div className="rounded-3xl border border-[#e6eee5] p-5 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] uppercase tracking-wider text-[#7a8a79]" style={{ fontFamily: M }}>Profile người chơi</p>
                  <p className="text-[22px] font-black text-[#1a1a1a] mt-1" style={{ fontFamily: F }}>{activePlayer.name}</p>
                  <p className="text-[13px] text-[#5a6a59] mt-1" style={{ fontFamily: F }}>{selected.sport} · Trình {activePlayer.scale.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>ELO hiện tại</p>
                  <p className="text-[34px] font-black text-[#006e26]" style={{ fontFamily: M }}>{activeProfile.currentElo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f6f9f6] rounded-2xl p-4">
                  <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>Tỷ lệ thắng</p>
                  <p className="text-[26px] font-black text-[#006e26] mt-1" style={{ fontFamily: M }}>{activeProfile.winRate}%</p>
                </div>
                <div className="bg-[#f6f9f6] rounded-2xl p-4">
                  <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>Assessment trước đó</p>
                  <p className="text-[26px] font-black text-[#006e26] mt-1" style={{ fontFamily: M }}>{activeProfile.previousAssessments.length}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: F }}>Lịch sử biến động ELO</p>
                <MiniChart values={activeProfile.eloHistory} />
              </div>

              <div>
                <p className="font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: F }}>Các trận đấu gần đây</p>
                <div className="space-y-2">
                  {activeProfile.recentMatches.map((match, index) => (
                    <div key={`${match.opponent}-${index}`} className="grid grid-cols-[1fr_0.45fr_0.45fr_0.45fr] items-center rounded-2xl bg-[#f6f9f6] px-3 py-3">
                      <span className="font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{match.opponent}</span>
                      <span className={`text-[12px] font-bold ${match.result === "Thắng" ? "text-[#006e26]" : "text-[#dc2626]"}`} style={{ fontFamily: F }}>{match.result}</span>
                      <span className="text-[12px] text-[#5a6a59]" style={{ fontFamily: M }}>{match.score}</span>
                      <span className={`text-[12px] font-bold ${match.eloChange >= 0 ? "text-[#006e26]" : "text-[#dc2626]"}`} style={{ fontFamily: M }}>
                        {match.eloChange >= 0 ? "+" : ""}{match.eloChange}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: F }}>Các Assessment trước đó</p>
                <div className="space-y-2">
                  {activeProfile.previousAssessments.map((assessment, index) => (
                    <div key={`${assessment.title}-${index}`} className="rounded-2xl border border-[#e6eee5] px-3 py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{assessment.title}</p>
                        <p className="text-[11px] text-[#7a8a79] mt-1" style={{ fontFamily: F }}>{assessment.date} · {assessment.venue}</p>
                      </div>
                      <span className="px-3 py-1.5 rounded-full bg-[#e8f5ee] text-[#006e26] text-[12px] font-black" style={{ fontFamily: M }}>
                        {assessment.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {needReview && !decision && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setDecisionBySession(prev => ({ ...prev, [selected.id]: "rejected" }))} className="py-3 rounded-2xl bg-[#fee2e2] text-[#dc2626] font-bold" style={{ fontFamily: F }}>Từ chối</button>
              <button onClick={() => setDecisionBySession(prev => ({ ...prev, [selected.id]: "approved" }))} className="py-3 rounded-2xl bg-[#006e26] text-white font-bold" style={{ fontFamily: F }}>Chấp nhận</button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export function AdminShell({ sessions, onLogout }: { sessions: Session[]; onLogout: () => void }) {
  const [view, setView] = useState<AdminView>("dashboard");
  return (
    <div className="min-h-screen bg-[#f6f9f6] flex">
      <AdminSidebar view={view} setView={setView} onLogout={onLogout} />
      <main className="flex-1 p-8 overflow-y-auto">
        {view === "dashboard" && <Dashboard sessions={sessions} />}
        {view === "trust" && <TrustVerification />}
        {view === "assessments" && <AssessmentReview sessions={sessions} />}
      </main>
    </div>
  );
}