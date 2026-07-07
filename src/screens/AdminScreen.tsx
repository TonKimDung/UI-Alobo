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
  const cards = [
    { label: "Chờ xác thực sân", value: trustCases.filter(c => c.status === "pending").length, sub: "Trust Score" },
    { label: "Chờ duyệt đánh giá", value: pendingAssessments, sub: "Trust ≤ 0.5" },
    { label: "Sân đã xác thực", value: trustCases.filter(c => c.status === "verified").length, sub: "Verified" },
    { label: "Tỉ lệ ổn định", value: "96%", sub: "Ít hủy / ít khiếu nại" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>Dashboard kiểm duyệt</h2>
        <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Quản lý xác thực chủ sân và kết quả đánh giá trình độ.</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
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

function TrustVerification() {
  const [selected, setSelected] = useState<CourtTrustCase>(trustCases[0]);
  const maxPlayers = Math.max(...selected.monthlyPlayers);
  const stability = Math.round(((maxPlayers - selected.monthlyPlayers[0]) / Math.max(selected.monthlyPlayers[0], 1)) * 100);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>Xác thực Trust Score chủ sân</h2>
        <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Admin xem độ ổn định của sân và minh chứng chủ sân upload.</p>
      </div>
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-5">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1.2fr_0.8fr_0.6fr_0.7fr_0.4fr] px-5 py-3 bg-[#f6f9f6] text-[12px] font-bold text-[#7a8a79]" style={{ fontFamily: M }}>
            <span>Sân</span><span>Chủ sân</span><span>Trust</span><span>Trạng thái</span><span></span>
          </div>
          {trustCases.map(c => (
            <button key={c.id} onClick={() => setSelected(c)} className={`w-full grid grid-cols-[1.2fr_0.8fr_0.6fr_0.7fr_0.4fr] items-center px-5 py-4 border-t border-[#eef2ec] text-left ${selected.id === c.id ? "bg-[#e8f5ee]/60" : "bg-white"}`}>
              <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{c.courtName}</span>
              <span className="text-[#5a6a59]" style={{ fontFamily: F }}>{c.ownerName}</span>
              <span className="font-black" style={{ fontFamily: M, color: c.trustScore > 0.5 ? G : "#dc2626" }}>{c.trustScore.toFixed(2)}</span>
              <span className="text-[12px] font-bold" style={{ fontFamily: F }}>{c.status === "pending" ? "Chờ duyệt" : c.status === "verified" ? "Đã xác thực" : "Từ chối"}</span>
              <span className="text-[#006e26] font-bold" style={{ fontFamily: F }}>Xem</span>
            </button>
          ))}
        </Card>

        <Card className="p-5 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-[#7a8a79]" style={{ fontFamily: M }}>Hồ sơ xác thực</p>
              <h3 className="text-[22px] font-black text-[#1a1a1a] mt-1" style={{ fontFamily: F }}>{selected.courtName}</h3>
              <p className="text-[#7a8a79]" style={{ fontFamily: F }}>{selected.ownerName}</p>
            </div>
            <TrustBadge score={selected.trustScore} />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { l: "Người chơi/tháng", v: selected.monthlyPlayers.at(-1) },
              { l: "Buổi đánh giá", v: selected.monthlySessions.reduce((a, b) => a + b, 0) },
              { l: "Tỉ lệ hủy", v: `${selected.cancellationRate}%` },
              { l: "Khiếu nại", v: `${selected.complaintRate}%` },
            ].map(x => (
              <div key={x.l} className="bg-[#f6f9f6] rounded-2xl p-3">
                <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>{x.l}</p>
                <p className="text-[20px] font-black text-[#006e26] mt-1" style={{ fontFamily: M }}>{x.v}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Độ ổn định sân</p>
              <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>Tăng {stability}% trong 6 tháng</p>
            </div>
            <MiniChart values={selected.monthlyPlayers} />
          </div>

          <div>
            <p className="font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: F }}>Minh chứng chủ sân upload</p>
            <div className="grid grid-cols-2 gap-2">
              {selected.evidence.map(e => (
                <div key={e.id} className="rounded-2xl border border-[#e6eee5] px-3 py-3 flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>{e.label}</span>
                  <span className={`text-[11px] font-bold ${e.status === "missing" ? "text-[#dc2626]" : "text-[#006e26]"}`} style={{ fontFamily: M }}>
                    {e.status === "missing" ? "Thiếu" : e.status === "verified" ? "Verified" : "Uploaded"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <button className="py-3 rounded-2xl bg-[#fee2e2] text-[#dc2626] font-bold" style={{ fontFamily: F }}>Từ chối</button>
            
            <button className="py-3 rounded-2xl bg-[#006e26] text-white font-bold" style={{ fontFamily: F }}>Chấp nhận</button>
          </div>
        </Card>
      </div>
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
        <p className="text-[#7a8a79] mt-1" style={{ fontFamily: F }}>Trust Score &gt; 0.5 thì tự duyệt, Trust Score ≤ 0.5 thì Admin xem qua rồi duyệt.</p>
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
            <div className="grid grid-cols-3 gap-2 mt-3">
              {["Chứng chỉ HLV", "Chứng chỉ trọng tài", "Bằng cấp thể thao"].map(x => (
                <div key={x} className="bg-white rounded-2xl px-3 py-2 text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: F }}>✓ {x}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Danh sách người tham gia đã được chấm điểm</p>
              <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>{scoredPlayers.length} người</p>
            </div>

            <div className="rounded-3xl border border-[#e6eee5] overflow-hidden">
              <div className="grid grid-cols-[1.2fr_0.55fr_1.15fr_0.45fr] px-4 py-3 bg-[#f6f9f6] text-[12px] font-bold text-[#7a8a79]" style={{ fontFamily: M }}>
                <span>Người tham gia</span><span>Điểm</span><span>Mô tả</span><span>ELO</span>
              </div>
              {scoredPlayers.length === 0 ? (
                <div className="px-4 py-5 text-[#7a8a79]" style={{ fontFamily: F }}>Chưa có danh sách điểm cho buổi này.</div>
              ) : scoredPlayers.map(player => (
                <button
                  key={player.userId}
                  onClick={() => setSelectedPlayerId(player.userId)}
                  className={`w-full grid grid-cols-[1.2fr_0.55fr_1.15fr_0.45fr] items-center px-4 py-3 border-t border-[#eef2ec] text-left ${activePlayer?.userId === player.userId ? "bg-[#e8f5ee]/70" : "bg-white"}`}
                >
                  <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{player.name}</span>
                  <span className="font-black text-[#006e26]" style={{ fontFamily: M }}>{player.scale.value}</span>
                  <span className="text-[13px] text-[#5a6a59]" style={{ fontFamily: F }}>{player.scale.desc}</span>
                  <span className="font-bold text-[#1a1a1a]" style={{ fontFamily: M }}>{player.elo}</span>
                </button>
              ))}
            </div>
          </div>

          {activePlayer && (
            <div className="rounded-3xl border border-[#e6eee5] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>Chi tiết điểm của</p>
                  <p className="text-[20px] font-black text-[#1a1a1a]" style={{ fontFamily: F }}>{activePlayer.name}</p>
                  <p className="text-[13px] text-[#5a6a59] mt-1" style={{ fontFamily: F }}>{selected.sport} · {activePlayer.scale.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] text-[#7a8a79]" style={{ fontFamily: F }}>{selected.sport === "Tennis" ? "NTRP" : "Level"}</p>
                  <p className="text-[34px] font-black text-[#006e26]" style={{ fontFamily: M }}>{activePlayer.scale.value}</p>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {CRITERIA.map(c => {
                  const raw = selected.scores[activePlayer.userId]?.[c.id] ?? 0;
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      <span>{c.emoji}</span>
                      <span className="flex-1 text-[13px] text-[#5a6a59]" style={{ fontFamily: F }}>{c.name}</span>
                      <span className="text-[12px] font-bold" style={{ fontFamily: M, color: SCORE_COLORS[raw] || "#6b7280" }}>{SCORE_LABELS[raw] || "–"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {needReview && !decision && (
            <div className="grid grid-cols-3 gap-3 pt-2">
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
