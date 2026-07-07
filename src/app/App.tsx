import { useState } from "react";
import {
  INITIAL_SESSIONS, INITIAL_CHALLENGES, INITIAL_MATCHMAKING, EQUAL_WEIGHTS, PLAYER_ID, PLAYER_NAME, PLAYER_AVATAR, OWNER_VENUE,
  type Role, type Screen, type Session, type Tab, type ChallengeMatch, type MatchmakingSession, type MatchPair, type RegStatus,
  TabBar
} from "./shared";
import { LoginScreen, RegisterScreen } from "../screens/AuthScreens";
import { CreateStep1, OwnerHomeScreen, EditSessionScreen, SessionDetailOwner, ScoringScreen, SessionResultsScreen, type CreateDraft } from "../screens/OwnerSessionScreens";
import { PlayerHomeScreen, PlayerSessionDetailScreen, PlayerMySessionsScreen, LeaderboardScreen } from "../screens/PlayerSessionScreens";
import { PlayerMatchesScreen, PlayerCreateChallengeScreen, PlayerChallengeDetailScreen, PlayerJoinMatchmakingScreen, PlayerMatchmakingDetailScreen } from "../screens/PlayerMatchScreens";
import { OwnerMatchesScreen, OwnerCreateMatchmakingScreen, OwnerMatchmakingDetailScreen } from "../screens/OwnerMatchScreens";
import { ProfileScreen } from "../screens/ProfileScreen";

export default function App() {
  const [role, setRole] = useState<Role>("owner");
  const [screen, setScreen] = useState<Screen>("login");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<number>(1);
  const [scoringUserId, setScoringUserId] = useState<string>("");
  const [challenges, setChallenges] = useState<ChallengeMatch[]>(INITIAL_CHALLENGES);
  const [matchmaking, setMatchmaking] = useState<MatchmakingSession[]>(INITIAL_MATCHMAKING);
  const [activeChallengeId, setActiveChallengeId] = useState<number>(101);
  const [activeMatchmakingId, setActiveMatchmakingId] = useState<number>(201);


  // Player's own registrations: sessionId -> status
  const [myRegs, setMyRegs] = useState<Record<number, RegStatus>>({
    2: "confirmed",
    3: "confirmed",
    5: "confirmed",
    6: "confirmed",
  });

  const activeSession = sessions.find(s => s.id === activeSessionId)!;

  const tabScreens: Record<Tab, Screen> = role === "owner"
    ? { home: "owner-home", sessions: "owner-matches", leaderboard: "leaderboard", profile: "profile" }
    : { home: "player-home", sessions: "player-matches", leaderboard: "leaderboard", profile: "profile" };

  const showTabBar = ["owner-home", "owner-matches", "leaderboard", "profile", "player-home", "player-matches", "player-my-sessions"].includes(screen);

  const handleTab = (t: Tab) => {
    setActiveTab(t);
    setScreen(tabScreens[t]);
  };

  const handleApprove = (userId: string) => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : {
      ...s, registrations: s.registrations.map(r => r.userId === userId ? { ...r, status: "confirmed" } : r)
    }));
  };

  const handleReject = (userId: string) => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : {
      ...s, registrations: s.registrations.map(r => r.userId === userId ? { ...r, status: "rejected" } : r)
    }));
  };

  const handleStart = () => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : { ...s, status: "in_progress" }));
  };

  const handleComplete = () => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : { ...s, status: "completed" }));
    setScreen("session-results");
  };

  const handleRemoveParticipant = (userId: string) => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : {
      ...s, registrations: s.registrations.filter(r => r.userId !== userId)
    }));
  };

  const handleCancelSession = () => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : { ...s, status: "cancelled" }));
  };

  const handleEditSave = (patch: Partial<Session>) => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : { ...s, ...patch }));
  };

  const handlePlayerCancelReg = () => {
    setMyRegs(prev => { const n = { ...prev }; delete n[activeSessionId]; return n; });
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : {
      ...s, registrations: s.registrations.filter(r => r.userId !== PLAYER_ID)
    }));
  };

  // Match handlers
  const handleCreateChallenge = (c: Omit<ChallengeMatch, "id" | "status">) => {
    setChallenges(prev => [{ ...c, id: Date.now(), status: "invited" }, ...prev]);
    setScreen("player-matches");
  };

  const handleChallengeAccept = () => {
    setChallenges(prev => prev.map(c => c.id === activeChallengeId ? { ...c, status: "confirmed" } : c));
    setScreen("player-matches");
  };

  const handleChallengeDecline = () => {
    setChallenges(prev => prev.map(c => c.id === activeChallengeId ? { ...c, status: "declined" } : c));
    setScreen("player-matches");
  };

  const handleJoinMatchmaking = (sessionId: number) => {
    setMatchmaking(prev => prev.map(m => m.id !== sessionId ? m : {
      ...m, registrations: [...m.registrations, { userId: PLAYER_ID, name: PLAYER_NAME, avatar: PLAYER_AVATAR, level: "Khá", elo: 1550 }]
    }));
  };

  const handleCreateMatchmakingSession = (m: Omit<MatchmakingSession, "id" | "registrations" | "matches">) => {
    const newM: MatchmakingSession = { ...m, id: Date.now(), registrations: [], matches: [] };
    setMatchmaking(prev => [newM, ...prev]);
    setScreen("owner-matches");
  };

  const handleArrangeMatches = () => {
    setMatchmaking(prev => prev.map(m => {
      if (m.id !== activeMatchmakingId) return m;
      const sorted = [...m.registrations].sort((a, b) => (b.elo ?? 0) - (a.elo ?? 0));
      const pairs: MatchPair[] = [];

      if (m.format === "singles") {
        // Pair adjacent players by ELO
        for (let i = 0; i + 1 < sorted.length; i += 2) {
          const courtIndex = (pairs.length % m.numCourts) + 1;
          pairs.push({
            id: pairs.length + 1,
            court: `Sân ${courtIndex}`,
            team1: [{ userId: sorted[i].userId, name: sorted[i].name, avatar: sorted[i].avatar }],
            team2: [{ userId: sorted[i + 1].userId, name: sorted[i + 1].name, avatar: sorted[i + 1].avatar }],
          });
        }
      } else {
        // Doubles: pair highest+lowest ELO as team1, mid pairs as team2
        // Strategy: team1 = [0,3], team2 = [1,2], then [4,7] vs [5,6] etc.
        for (let i = 0; i + 3 < sorted.length; i += 4) {
          const courtIndex = (pairs.length % m.numCourts) + 1;
          pairs.push({
            id: pairs.length + 1,
            court: `Sân ${courtIndex}`,
            team1: [
              { userId: sorted[i].userId, name: sorted[i].name, avatar: sorted[i].avatar },
              { userId: sorted[i + 3].userId, name: sorted[i + 3].name, avatar: sorted[i + 3].avatar },
            ],
            team2: [
              { userId: sorted[i + 1].userId, name: sorted[i + 1].name, avatar: sorted[i + 1].avatar },
              { userId: sorted[i + 2].userId, name: sorted[i + 2].name, avatar: sorted[i + 2].avatar },
            ],
          });
        }
      }
      return { ...m, matches: pairs, status: "in_progress" };
    }));
  };

  const handleRecordResult = (matchId: number, result: string, winner: "team1" | "team2") => {
    setMatchmaking(prev => prev.map(m => {
      if (m.id !== activeMatchmakingId) return m;
      const matches = m.matches.map(p => p.id === matchId ? { ...p, result, winner } : p);
      const allDone = matches.every(p => p.result);
      return { ...m, matches, status: allDone ? "completed" : m.status };
    }));
  };

  const handleSaveScore = (scores: Record<string, number>) => {
    setSessions(prev => prev.map(s => s.id !== activeSessionId ? s : {
      ...s, scores: { ...s.scores, [scoringUserId]: scores }
    }));
    setScreen("session-detail");
  };

  const handleJoin = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId)!;
    const status: RegStatus = session.approvalType === "auto" ? "confirmed" : "pending";
    setMyRegs(prev => ({ ...prev, [sessionId]: status }));
    setSessions(prev => prev.map(s => s.id !== sessionId ? s : {
      ...s, registrations: [...s.registrations, { userId: PLAYER_ID, name: PLAYER_NAME, avatar: PLAYER_AVATAR, level: "Khá", status }]
    }));
  };

  const handleCreateSave = (draft: CreateDraft) => {
    const newSession: Session = {
      id: Date.now(),
      title: draft.title,
      description: draft.description,
      date: draft.date,
      time: draft.time,
      sport: draft.sport,
      venueName: OWNER_VENUE,
      ownerName: "Nguyễn Văn A",
      fee: Number(draft.fee) || 0,
      scorerName: draft.scorerName,
      approvalType: draft.approvalType,
      status: "open",
      maxParticipants: Number(draft.maxParticipants) || 16,
      criteriaWeights: EQUAL_WEIGHTS,
      registrations: [],
      scores: {},
    };
    setSessions(prev => [newSession, ...prev]);
    setScreen("owner-home");
    setActiveTab("home");
  };

  const renderScreen = (): React.ReactNode => {
    switch (screen) {
      case "login":
        return <LoginScreen onLogin={r => { setRole(r); setScreen(r === "owner" ? "owner-home" : "player-home"); setActiveTab("home"); }} onRegister={() => setScreen("register")} />;
      case "register":
        return <RegisterScreen onBack={() => setScreen("login")} onDone={() => { setScreen(role === "owner" ? "owner-home" : "player-home"); setActiveTab("home"); }} />;
      case "owner-home":
        return <OwnerHomeScreen sessions={sessions} onSessionTap={id => { setActiveSessionId(id); setScreen("session-detail"); }} onCreate={() => setScreen("create-step1")} />;
      case "owner-sessions":
        return <OwnerHomeScreen sessions={sessions} onSessionTap={id => { setActiveSessionId(id); setScreen("session-detail"); }} onCreate={() => setScreen("create-step1")} />;
      case "session-detail":
        return <SessionDetailOwner session={activeSession} onBack={() => { setScreen("owner-home"); setActiveTab("home"); }}
          onScore={uid => { setScoringUserId(uid); setScreen("scoring"); }}
          onApprove={handleApprove} onReject={handleReject}
          onStart={handleStart} onComplete={handleComplete}
          onRemoveParticipant={handleRemoveParticipant}
          onCancelSession={() => { handleCancelSession(); setScreen("owner-home"); setActiveTab("home"); }}
          onEdit={() => setScreen("edit-session")} />;
      case "edit-session":
        return <EditSessionScreen session={activeSession} onBack={() => setScreen("session-detail")} onSave={handleEditSave} />;
      case "scoring":
        return <ScoringScreen session={activeSession} userId={scoringUserId} onBack={() => setScreen("session-detail")} onSave={handleSaveScore} />;
      case "session-results":
        return <SessionResultsScreen session={activeSession} onBack={() => { setScreen("owner-home"); setActiveTab("home"); }} />;
      case "create-step1":
        return <CreateStep1 onBack={() => setScreen("owner-home")} onSave={handleCreateSave} />;
      case "player-home":
        return <PlayerHomeScreen sessions={sessions} myRegs={myRegs} onJoin={handleJoin} onSessionTap={id => { setActiveSessionId(id); setScreen("player-session-detail"); }} />;
      case "player-session-detail":
        return <PlayerSessionDetailScreen session={activeSession} myStatus={myRegs[activeSessionId]}
          onBack={() => setScreen("player-home")} onCancelReg={() => { handlePlayerCancelReg(); setScreen("player-home"); }} />;
      case "player-my-sessions":
        return <PlayerMySessionsScreen sessions={sessions} myRegs={myRegs} onSessionTap={id => { setActiveSessionId(id); setScreen("player-session-detail"); }} />;
      case "player-matches":
        return <PlayerMatchesScreen challenges={challenges} matchmaking={matchmaking}
          onCreateChallenge={() => setScreen("player-create-challenge")}
          onJoinMatchmaking={() => setScreen("player-join-matchmaking")}
          onChallengeTap={id => { setActiveChallengeId(id); setScreen("player-challenge-detail"); }}
          onMatchmakingTap={id => { setActiveMatchmakingId(id); setScreen("player-matchmaking-detail"); }} />;
      case "player-create-challenge":
        return <PlayerCreateChallengeScreen onBack={() => setScreen("player-matches")} onSubmit={handleCreateChallenge} />;
      case "player-challenge-detail": {
        const ch = challenges.find(c => c.id === activeChallengeId)!;
        return <PlayerChallengeDetailScreen match={ch} onBack={() => setScreen("player-matches")} onAccept={handleChallengeAccept} onDecline={handleChallengeDecline} />;
      }
      case "player-join-matchmaking":
        return <PlayerJoinMatchmakingScreen matchmaking={matchmaking} onBack={() => setScreen("player-matches")} onJoin={id => { handleJoinMatchmaking(id); setScreen("player-matches"); }} />;
      case "player-matchmaking-detail": {
        const mm = matchmaking.find(m => m.id === activeMatchmakingId)!;
        return <PlayerMatchmakingDetailScreen session={mm} onBack={() => setScreen("player-matches")} />;
      }
      case "owner-matches":
        return <OwnerMatchesScreen matchmaking={matchmaking} onCreate={() => setScreen("owner-create-matchmaking")} onTap={id => { setActiveMatchmakingId(id); setScreen("owner-matchmaking-detail"); }} />;
      case "owner-create-matchmaking":
        return <OwnerCreateMatchmakingScreen onBack={() => setScreen("owner-matches")} onSave={handleCreateMatchmakingSession} />;
      case "owner-matchmaking-detail": {
        const mm = matchmaking.find(m => m.id === activeMatchmakingId)!;
        return <OwnerMatchmakingDetailScreen session={mm} onBack={() => setScreen("owner-matches")} onArrange={handleArrangeMatches} onRecordResult={handleRecordResult} />;
      }
      case "leaderboard":
        return <LeaderboardScreen sessions={sessions} role={role} />;
      case "profile":
        return <ProfileScreen role={role} sessions={sessions} onLogout={() => setScreen("login")} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-600 flex items-center justify-center p-4">
      <div className="relative flex flex-col overflow-hidden"
        style={{ width: 390, height: 844, borderRadius: 48, border: "10px solid #111", boxShadow: "0 40px 100px rgba(0,0,0,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.1)", background: "#f6f9f6" }}>
        <div className="flex-1 overflow-hidden flex flex-col" style={{ paddingBottom: showTabBar ? 64 : 0 }}>
          {renderScreen()}
        </div>
        {showTabBar && (
          <div className="absolute bottom-0 left-0 right-0">
            <TabBar active={activeTab} role={role} onSelect={handleTab} />
          </div>
        )}
      </div>
    </div>
  );
}
