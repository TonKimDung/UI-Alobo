import { useMemo, useState } from "react";
import { F, M } from "../app/shared";

type QuizSport = "Pickleball" | "Tennis" | "Cầu lông";
type AnswerValue = 1 | 2 | 3 | 4 | 5;
type CommonAnswer = string;

type CommonQuestion = {
  id: "gender" | "age" | "racketBackground" | "experience";
  title: string;
  note?: string;
  options: string[];
};

type Question = {
  id: string;
  skill: string;
  title: string;
  weight: number;
  options: string[];
};

type Result = {
  level: string;
  description: string;
};

const COMMON_QUESTIONS: CommonQuestion[] = [
  {
    id: "gender",
    title: "Giới tính của bạn?",
    options: ["Nam", "Nữ", "Khác / Không muốn tiết lộ"],
  },
  {
    id: "age",
    title: "Độ tuổi của bạn?",
    note: "Thông tin này chỉ phục vụ phân tích nhóm người chơi và không ảnh hưởng đến kết quả đánh giá.",
    options: ["Dưới 18 tuổi", "18 – 25 tuổi", "26 – 35 tuổi", "36 – 45 tuổi", "Trên 45 tuổi"],
  },
  {
    id: "racketBackground",
    title: "Trước khi chơi môn này, bạn đã từng chơi môn thể thao dùng vợt nào chưa?",
    note: "Nếu từng chơi nhiều môn, hãy chọn môn bạn có nhiều kinh nghiệm nhất.",
    options: [
      "Chưa từng chơi môn thể thao dùng vợt nào",
      "Cầu lông",
      "Tennis",
      "Pickleball",
      "Bóng bàn",
      "Squash / Padel / Môn dùng vợt khác",
    ],
  },
  {
    id: "experience",
    title: "Bạn đã chơi môn này trong bao lâu?",
    options: ["Dưới 3 tháng", "3 tháng – dưới 1 năm", "1 – dưới 3 năm", "3 – dưới 5 năm", "Trên 5 năm"],
  },
];

const SPORT_META: Record<QuizSport, { icon: string; subtitle: string }> = {
  Pickleball: { icon: "🏓", subtitle: "Đánh giá theo thang trình 1.0 – 6.0+" },
  Tennis: { icon: "🎾", subtitle: "Đánh giá theo thang NTRP 1.0 – 6.0+" },
  "Cầu lông": { icon: "🏸", subtitle: "Đánh giá theo trình D – Open" },
};

const QUESTIONS: Record<QuizSport, Question[]> = {
  Pickleball: [
    {
      id: "rally", skill: "Rally", title: "Rally của bạn thường kéo dài bao nhiêu?", weight: 0.15,
      options: [
        "1–3 đường bóng — Rally thường kết thúc nhanh do lỗi tự đánh hỏng.",
        "4–7 đường bóng — Giữ bóng được ở tốc độ nhẹ nhưng chưa ổn định.",
        "8–12 đường bóng — Duy trì rally khá ổn định ở tốc độ trung bình.",
        "13–20 đường bóng — Rally dài, ít lỗi kể cả khi đối thủ tăng tốc.",
        "Trên 20 đường bóng — Duy trì rally dài ở cường độ cao và chủ động thay đổi nhịp.",
      ],
    },
    {
      id: "serve", skill: "Giao và trả giao", title: "Khả năng giao bóng và trả giao bóng của bạn?", weight: 0.15,
      options: [
        "Dưới 50% bóng vào sân — Thường xuyên giao hoặc trả giao lỗi.",
        "50–65% bóng vào sân — Đưa bóng vào sân được nhưng hướng và độ sâu chưa ổn định.",
        "66–80% bóng vào sân — Tương đối ổn định, đôi lúc đưa được bóng sâu.",
        "81–90% bóng vào sân — Phần lớn bóng đi sâu, kiểm soát hướng và tiến lên NVZ.",
        "Trên 90% bóng vào sân — Kiểm soát tốt hướng, độ sâu, tốc độ và khai thác điểm yếu.",
      ],
    },
    {
      id: "dink", skill: "Dink", title: "Khả năng Dink của bạn?", weight: 0.20,
      options: [
        "Dưới 30% bóng thấp và hợp lệ — Bóng thường mắc lưới hoặc pop-up cao.",
        "30–50% bóng thấp và hợp lệ — Dink được nhưng chưa ổn định.",
        "51–70% bóng thấp và hợp lệ — Có thể Dink chéo sân và thẳng sân ở mức cơ bản.",
        "71–85% bóng thấp và hợp lệ — Dink ổn định, kiểm soát hướng và duy trì Dink battle.",
        "Trên 85% bóng thấp và hợp lệ — Điều hướng chính xác, tạo khoảng trống và tấn công đúng lúc.",
      ],
    },
    {
      id: "third", skill: "Third Shot Drop", title: "Khả năng Third Shot Drop của bạn?", weight: 0.20,
      options: [
        "Dưới 20% thành công — Chưa thực hiện được hoặc chưa hiểu cách đánh.",
        "20–40% thành công — Bóng thường mắc lưới, quá cao hoặc đi ra ngoài.",
        "41–60% thành công — Có thể đưa bóng vào NVZ và tiến lên lưới trong một số tình huống.",
        "61–80% thành công — Khá ổn định từ nhiều vị trí trên sân.",
        "Trên 80% thành công — Kiểm soát tốt độ cao, hướng, xoáy và thực hiện dưới áp lực.",
      ],
    },
    {
      id: "volley", skill: "Volley / Block / Reset", title: "Khả năng Volley, Block và Reset của bạn?", weight: 0.15,
      options: [
        "Dưới 30% bóng được kiểm soát — Thường phản xạ chậm hoặc đánh bóng ra ngoài.",
        "30–50% bóng được kiểm soát — Volley được bóng chậm nhưng khó xử lý bóng tốc độ cao.",
        "51–70% bóng được kiểm soát — Volley cơ bản ổn định, Block được tình huống đơn giản.",
        "71–85% bóng được kiểm soát — Kiểm soát tốt Volley, Block và Reset khi bị tấn công.",
        "Trên 85% bóng được kiểm soát — Chuyển đổi tốt giữa phòng thủ, Reset và phản công.",
      ],
    },
    {
      id: "strategy", skill: "Vị trí và chiến thuật", title: "Khả năng chọn vị trí và sử dụng chiến thuật?", weight: 0.15,
      options: [
        "Đứng sai vị trí trên 50% tình huống — Chưa biết khi nào nên tiến lên NVZ.",
        "Đứng đúng khoảng 50–60% — Biết tiến lên lưới nhưng thường để hở khoảng trống.",
        "Đứng đúng khoảng 61–75% — Biết phối hợp cơ bản và di chuyển cùng đồng đội.",
        "Đứng đúng khoảng 76–90% — Biết khai thác điểm yếu, thay đổi nhịp và phối hợp khá tốt.",
        "Đứng đúng trên 90% — Đọc tình huống sớm và điều chỉnh chiến thuật theo đối thủ.",
      ],
    },
  ],
  Tennis: [
    {
      id: "rally", skill: "Rally", title: "Rally của bạn thường kéo dài bao nhiêu?", weight: 0.20,
      options: [
        "1–3 đường bóng — Rally thường kết thúc do lỗi kỹ thuật cơ bản.",
        "4–6 đường bóng — Duy trì được ở tốc độ chậm khi bóng thuận lợi.",
        "7–12 đường bóng — Duy trì tương đối ổn định ở tốc độ trung bình.",
        "13–20 đường bóng — Rally ổn định kể cả khi phải di chuyển và đổi hướng.",
        "Trên 20 đường bóng — Kiểm soát rally dài, thay đổi nhịp và chủ động xây dựng điểm.",
      ],
    },
    {
      id: "serve", skill: "Giao và trả giao", title: "Khả năng giao bóng và trả giao bóng?", weight: 0.20,
      options: [
        "Dưới 40% giao bóng vào ô hợp lệ — Thường giao lỗi kép và trả giao hỏng.",
        "40–55% — Giao và trả được bóng chậm nhưng chưa ổn định.",
        "56–70% — Giao một, giao hai và trả giao cơ bản tương đối ổn định.",
        "71–85% — Kiểm soát được hướng, độ sâu và một số loại xoáy.",
        "Trên 85% — Giao bóng tạo lợi thế, trả giao chủ động và tấn công giao hai.",
      ],
    },
    {
      id: "groundstroke", skill: "Forehand và Backhand", title: "Khả năng Forehand và Backhand?", weight: 0.20,
      options: [
        "Dưới 40% bóng vào sân — Chưa kiểm soát được động tác hoặc điểm tiếp xúc.",
        "40–55% — Đánh được bóng dễ nhưng thường lỗi khi phải di chuyển.",
        "56–70% — Hai bên tương đối ổn định, duy trì được rally cơ bản.",
        "71–85% — Kiểm soát tốt hướng, độ sâu và xoáy trong thi đấu.",
        "Trên 85% — Forehand hoặc Backhand có thể trở thành cú tấn công kết thúc điểm.",
      ],
    },
    {
      id: "movement", skill: "Di chuyển", title: "Khả năng di chuyển và phục hồi vị trí?", weight: 0.15,
      options: [
        "Tiếp cận dưới 40% bóng ngoài tầm đứng — Thường đến bóng quá muộn.",
        "40–55% — Di chuyển được với bóng gần nhưng chậm khi đổi hướng.",
        "56–70% — Bao sân cơ bản và quay về vị trí tương đối tốt.",
        "71–85% — Di chuyển hiệu quả, giữ thăng bằng và phục hồi nhanh.",
        "Trên 85% — Đọc bóng sớm, tối ưu bước chân và giữ chất lượng cú đánh khi bị ép.",
      ],
    },
    {
      id: "volley", skill: "Volley", title: "Khả năng Volley và chơi trên lưới?", weight: 0.10,
      options: [
        "Dưới 30% Volley vào sân — Chưa biết kỹ thuật hoặc thường tránh lên lưới.",
        "30–50% — Xử lý được bóng dễ nhưng thiếu ổn định.",
        "51–70% — Volley cơ bản và xử lý được tình huống thuận lợi.",
        "71–85% — Biết lên lưới đúng lúc, Volley và Overhead khá ổn định.",
        "Trên 85% — Chơi lưới chủ động, phản xạ tốt và tạo áp lực lớn.",
      ],
    },
    {
      id: "strategy", skill: "Chiến thuật", title: "Khả năng sử dụng chiến thuật trong thi đấu?", weight: 0.15,
      options: [
        "Dưới 30% điểm đấu có chủ đích — Chủ yếu cố gắng đưa bóng qua lưới.",
        "30–45% — Biết đánh vào khoảng trống nhưng chưa ổn định.",
        "46–65% — Biết giữ bóng an toàn, điều hướng và chờ cơ hội.",
        "66–80% — Biết xây dựng điểm, khai thác điểm yếu và thay đổi hướng.",
        "Trên 80% — Kiểm soát nhịp trận và điều chỉnh chiến thuật theo đối thủ.",
      ],
    },
  ],
  "Cầu lông": [
    {
      id: "rally", skill: "Rally", title: "Bạn thường duy trì rally được bao nhiêu?", weight: 0.20,
      options: [
        "1–3 lần chạm cầu — Rally thường kết thúc do lỗi tự đánh hỏng.",
        "4–8 lần chạm cầu ở tốc độ chậm.",
        "9–15 lần chạm cầu ở tốc độ trung bình.",
        "16–25 lần chạm cầu, ít mắc lỗi.",
        "Trên 25 lần chạm cầu ở tốc độ cao và chủ động điều cầu.",
      ],
    },
    {
      id: "serve", skill: "Giao và trả giao", title: "Khả năng giao cầu và trả giao cầu của bạn?", weight: 0.15,
      options: [
        "Dưới 50% số lần giao hoặc trả cầu thành công.",
        "Khoảng 50–65% số lần thành công.",
        "Khoảng 66–80% số lần thành công.",
        "Khoảng 81–90%, kiểm soát được điểm rơi.",
        "Trên 90%, biết thay đổi chiến thuật giao cầu.",
      ],
    },
    {
      id: "clear", skill: "Clear và Drop Shot", title: "Khả năng Clear và Drop Shot của bạn?", weight: 0.20,
      options: [
        "Dưới 30% số lần thực hiện thành công.",
        "Khoảng 30–50% số lần thực hiện thành công.",
        "Khoảng 51–70% số lần thực hiện thành công.",
        "Khoảng 71–85%, điều cầu khá tốt.",
        "Trên 85%, kiểm soát tốt điểm rơi và nhịp độ.",
      ],
    },
    {
      id: "smash", skill: "Smash và tấn công", title: "Khả năng Smash và tấn công của bạn?", weight: 0.20,
      options: [
        "Dưới 30% số cú Smash thành công.",
        "Khoảng 30–50% số cú Smash thành công.",
        "Khoảng 51–70% số cú Smash thành công.",
        "Khoảng 71–85%, biết tiếp tục tấn công sau Smash.",
        "Trên 85%, Smash là vũ khí ghi điểm chính.",
      ],
    },
    {
      id: "footwork", skill: "Footwork", title: "Khả năng di chuyển của bạn?", weight: 0.15,
      options: [
        "Tiếp cận dưới 40% các quả cầu khó.",
        "Tiếp cận khoảng 40–55% các quả cầu khó.",
        "Tiếp cận khoảng 56–70% các quả cầu khó.",
        "Tiếp cận khoảng 71–85%, phục hồi vị trí tốt.",
        "Tiếp cận trên 85%, luôn chủ động vị trí trên sân.",
      ],
    },
    {
      id: "strategy", skill: "Chiến thuật", title: "Khả năng sử dụng chiến thuật trong thi đấu?", weight: 0.10,
      options: [
        "Chủ yếu chỉ đưa cầu qua lưới, chưa có chiến thuật rõ ràng.",
        "Biết đánh vào khoảng trống nhưng chưa ổn định.",
        "Biết điều cầu, kéo đối thủ di chuyển và chờ cơ hội tấn công.",
        "Biết khai thác điểm yếu, thay đổi tốc độ và hướng cầu.",
        "Kiểm soát nhịp trận và điều chỉnh chiến thuật linh hoạt theo đối thủ.",
      ],
    },
  ],
};

const getAnswer = (answers: Record<string, AnswerValue>, id: string) => answers[id] ?? 1;

function calculateResult(sport: QuizSport, answers: Record<string, AnswerValue>): Result {
  const questions = QUESTIONS[sport];
  const score = Number(questions.reduce((sum, q) => sum + getAnswer(answers, q.id) * q.weight, 0).toFixed(2));

  if (sport === "Pickleball") {
    const ranges = [
      [1.49, "1.0"], [1.99, "2.0"], [2.39, "2.5"], [2.79, "3.0"], [3.19, "3.5"],
      [3.59, "4.0"], [3.99, "4.5"], [4.39, "5.0"], [4.69, "5.5+"], [5, "6.0+"],
    ] as const;
    const base = ranges.find(([max]) => score <= max)?.[1] ?? "6.0+";
    const order = ["1.0", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5+", "6.0+"];
    let index = order.indexOf(base);
    const cap = (level: string) => { index = Math.min(index, order.indexOf(level)); };
    const rally = getAnswer(answers, "rally"), dink = getAnswer(answers, "dink"), third = getAnswer(answers, "third");
    const volley = getAnswer(answers, "volley"), strategy = getAnswer(answers, "strategy");
    if (dink === 1) cap("2.5");
    if (dink === 2) cap("3.0");
    if (third <= 2) cap("3.5");
    if (volley === 1) cap("3.0");
    if (rally === 1) cap("2.0");
    if (rally === 2) cap("2.5");
    if (index >= order.indexOf("3.5") && (rally < 3 || dink < 3)) cap("3.0");
    if (index >= order.indexOf("4.0") && (rally < 4 || dink < 4 || third < 4)) cap("3.5");
    if (index >= order.indexOf("4.5") && (dink < 4 || third < 4 || volley < 4 || strategy < 4)) cap("4.0");
    const values = questions.map(q => getAnswer(answers, q.id));
    if (index >= order.indexOf("5.0") && (!values.every(v => v >= 4) || values.filter(v => v === 5).length < 3)) cap("4.5");
    const level = order[index];
    return { level, description: `Trình Pickleball ${level}` };
  }

  if (sport === "Tennis") {
    const ranges = [
      [1.19, "1.0", "Mới bắt đầu"], [1.49, "1.5", "Mới học"], [1.89, "2.0", "Chơi cơ bản"],
      [2.29, "2.5", "Rally ngắn"], [2.69, "3.0", "Chơi phong trào"], [3.19, "3.5", "Trình trung cấp"],
      [3.69, "4.0", "Thi đấu phong trào khá"], [4.19, "4.5", "Thi đấu mạnh"], [4.59, "5.0", "Thi đấu cấp cao"],
      [4.84, "5.5", "Bán chuyên"], [5, "6.0+", "Chuyên nghiệp"],
    ] as const;
    const found = ranges.find(([max]) => score <= max) ?? ranges[ranges.length - 1];
    const base = found[1];
    const order = ranges.map(r => r[1]);
    let index = order.indexOf(base);
    const cap = (level: string) => { index = Math.min(index, order.indexOf(level as typeof order[number])); };
    const rally = getAnswer(answers, "rally"), ground = getAnswer(answers, "groundstroke");
    const serve = getAnswer(answers, "serve"), movement = getAnswer(answers, "movement");
    if (rally === 1) cap("1.5");
    if (rally === 2) cap("2.5");
    if (ground === 1) cap("2.0");
    if (ground === 2) cap("2.5");
    if (serve === 1) cap("2.5");
    if (index >= order.indexOf("3.0") && (rally < 3 || ground < 3)) cap("2.5");
    if (index >= order.indexOf("3.5") && (rally < 3 || ground < 3 || movement < 3)) cap("3.0");
    if (index >= order.indexOf("4.0") && (rally < 4 || ground < 4 || serve < 4)) cap("3.5");
    if (index >= order.indexOf("4.5") && (rally < 4 || ground < 4 || serve < 4 || movement < 4)) cap("4.0");
    const values = questions.map(q => getAnswer(answers, q.id));
    if (index >= order.indexOf("5.0") && (!values.every(v => v >= 4) || values.filter(v => v === 5).length < 3)) cap("4.5");
    const level = order[index];
    const description = ranges.find(r => r[1] === level)?.[2] ?? "";
    return { level, description };
  }

  const ranges = [
    [1.49, "D"], [1.99, "C"], [2.49, "C+"], [3.19, "B"],
    [3.69, "B+"], [4.19, "A"], [4.59, "A+"], [5, "Open"],
  ] as const;
  const base = ranges.find(([max]) => score <= max)?.[1] ?? "Open";
  const order = ranges.map(r => r[1]);
  let index = order.indexOf(base);
  const cap = (level: string) => { index = Math.min(index, order.indexOf(level as typeof order[number])); };
  const rally = getAnswer(answers, "rally"), footwork = getAnswer(answers, "footwork");
  const clear = getAnswer(answers, "clear"), smash = getAnswer(answers, "smash"), strategy = getAnswer(answers, "strategy");
  if (rally === 1) cap("D");
  if (rally === 2) cap("C");
  if (footwork === 1) cap("C");
  if (clear === 1) cap("C");
  if (smash === 1) cap("C+");
  if (index >= order.indexOf("B") && (rally < 3 || clear < 3)) cap("C+");
  if (index >= order.indexOf("B+") && (rally < 4 || footwork < 4 || clear < 4)) cap("B");
  if (index >= order.indexOf("A") && (rally < 4 || footwork < 4 || smash < 4)) cap("B+");
  if (index >= order.indexOf("A+") && (rally < 5 || footwork < 5 || smash < 5 || strategy < 4)) cap("A");
  if (index >= order.indexOf("Open") && !questions.every(q => getAnswer(answers, q.id) === 5)) cap("A+");
  const level = order[index];
  return { level, description: `Trình cầu lông ${level}` };
}

function getRecommendation(sport: QuizSport, level: string): string {
  if (sport === "Pickleball") {
    if (["1.0", "2.0", "2.5"].includes(level)) return "Bạn nên ưu tiên kỹ thuật đưa bóng ổn định, giao và trả giao an toàn, đồng thời luyện Dink ở tốc độ chậm trước khi tăng nhịp độ.";
    if (["3.0", "3.5"].includes(level)) return "Bạn đã có nền tảng chơi phong trào. Hãy tập trung cải thiện Dink, Third Shot Drop và khả năng tiến lên khu vực NVZ đúng thời điểm.";
    if (["4.0", "4.5"].includes(level)) return "Bạn có thể tham gia nhóm chơi khá. Nên luyện Reset dưới áp lực, chuyển trạng thái phòng thủ – phản công và phối hợp chiến thuật với đồng đội.";
    return "Bạn đang ở nhóm trình độ cao. Hãy duy trì độ ổn định trong thi đấu, phát triển vũ khí sở trường và tham gia các trận có cường độ cao hơn.";
  }
  if (sport === "Tennis") {
    if (["1.0", "1.5", "2.0", "2.5"].includes(level)) return "Bạn nên củng cố kỹ thuật cơ bản, điểm tiếp xúc bóng, giao bóng an toàn và khả năng duy trì rally ở tốc độ chậm.";
    if (["3.0", "3.5"].includes(level)) return "Bạn đã có nền tảng phong trào. Hãy cải thiện độ sâu Groundstroke, bước chân phục hồi và sự ổn định của giao bóng hai.";
    if (["4.0", "4.5"].includes(level)) return "Bạn có thể thi đấu ở nhóm khá mạnh. Nên tập xây dựng điểm đấu, thay đổi hướng bóng và chủ động chuyển từ phòng thủ sang tấn công.";
    return "Bạn đang ở trình độ cao. Hãy tập trung vào độ ổn định dưới áp lực, chiến thuật theo đối thủ và chất lượng cú đánh quyết định.";
  }
  if (["D", "C", "C+"].includes(level)) return "Bạn nên ưu tiên kỹ thuật giao cầu, Clear, Drop và di chuyển cơ bản để duy trì rally ổn định trước khi tăng tốc độ trận đấu.";
  if (["B", "B+"].includes(level)) return "Bạn đã có nền tảng phong trào tốt. Hãy cải thiện Footwork, khả năng điều cầu và chuỗi tấn công sau Smash.";
  if (["A", "A+"].includes(level)) return "Bạn có thể chơi ở nhóm trình độ cao. Nên luyện khả năng đọc tình huống, thay đổi nhịp và giữ chất lượng kỹ thuật khi thi đấu áp lực.";
  return "Bạn đang ở nhóm Open. Hãy duy trì thể lực, độ ổn định và tiếp tục phát triển chiến thuật thi đấu ở cường độ cao.";
}

export function SelfAssessmentScreen({ onBack }: { onBack: () => void }) {
  const [sport, setSport] = useState<QuizSport | null>(null);
  const [commonQuestionIndex, setCommonQuestionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [commonAnswers, setCommonAnswers] = useState<Record<string, CommonAnswer>>({});
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [finished, setFinished] = useState(false);

  const questions = sport ? QUESTIONS[sport] : [];
  const isCommonSection = sport !== null && commonQuestionIndex < COMMON_QUESTIONS.length;
  const currentCommonQuestion = isCommonSection ? COMMON_QUESTIONS[commonQuestionIndex] : null;
  const currentQuestion = !isCommonSection ? questions[questionIndex] : undefined;
  const result = useMemo(() => sport && finished ? calculateResult(sport, answers) : null, [sport, finished, answers]);

  const selectSport = (selected: QuizSport) => {
    setSport(selected);
    setCommonQuestionIndex(0);
    setQuestionIndex(0);
    setCommonAnswers({});
    setAnswers({});
    setFinished(false);
  };

  const selectCommonAnswer = (value: CommonAnswer) => {
    if (!currentCommonQuestion) return;
    setCommonAnswers({ ...commonAnswers, [currentCommonQuestion.id]: value });
    setCommonQuestionIndex(commonQuestionIndex + 1);
  };

  const selectAnswer = (value: AnswerValue) => {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    if (questionIndex === questions.length - 1) setFinished(true);
    else setQuestionIndex(questionIndex + 1);
  };

  const restart = () => {
    setSport(null);
    setCommonQuestionIndex(0);
    setQuestionIndex(0);
    setCommonAnswers({});
    setAnswers({});
    setFinished(false);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f6f9f6]">
      <div className="px-4 pt-12 pb-4 bg-white border-b border-[#eef2ec] flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={sport && !finished ? () => {
            if (isCommonSection) {
              if (commonQuestionIndex > 0) setCommonQuestionIndex(commonQuestionIndex - 1);
              else setSport(null);
            } else if (questionIndex > 0) {
              setQuestionIndex(questionIndex - 1);
            } else {
              setCommonQuestionIndex(COMMON_QUESTIONS.length - 1);
            }
          } : onBack}
          className="w-10 h-10 rounded-xl bg-[#f6f9f6] flex items-center justify-center border border-[#eef2ec]"
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5L9 16" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-[18px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Tự đánh giá trình độ</h1>
          <p className="text-[11px] text-[#7a8a79]" style={{ fontFamily: F }}>Kết quả mang tính tham khảo</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        {!sport && (
          <div>
            <div className="bg-[#eaf6ed] rounded-2xl p-4 border border-[#d8eadc] mb-5">
              <p className="text-[15px] font-bold text-[#164d27]" style={{ fontFamily: F }}>Chọn môn bạn muốn đánh giá</p>
              <p className="text-[12px] text-[#5f7b66] mt-1 leading-relaxed" style={{ fontFamily: F }}>
                Bài đánh giá gồm 4 câu thông tin chung và 6 câu kỹ năng. Hãy chọn đáp án gần nhất với khả năng thực tế của bạn.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {(Object.keys(SPORT_META) as QuizSport[]).map(item => (
                <button key={item} onClick={() => selectSport(item)} className="bg-white rounded-2xl border border-[#e6eee5] px-4 py-4 flex items-center gap-4 text-left active:scale-[0.99] transition-transform">
                  <div className="w-14 h-14 rounded-2xl bg-[#f2f8f2] flex items-center justify-center text-[28px]">{SPORT_META[item].icon}</div>
                  <div className="flex-1">
                    <p className="text-[16px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>{item}</p>
                    <p className="text-[11px] text-[#7a8a79] mt-1" style={{ fontFamily: F }}>{SPORT_META[item].subtitle}</p>
                  </div>
                  <span className="text-[#9fb09f]">›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {sport && !finished && currentCommonQuestion && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-[#006e26]" style={{ fontFamily: M }}>{SPORT_META[sport].icon} {sport}</span>
              <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: M }}>Câu {commonQuestionIndex + 1}/{COMMON_QUESTIONS.length + questions.length}</span>
            </div>
            <div className="h-2 bg-[#e7eee6] rounded-full overflow-hidden mb-5">
              <div className="h-full bg-[#006e26] rounded-full transition-all" style={{ width: `${((commonQuestionIndex + 1) / (COMMON_QUESTIONS.length + questions.length)) * 100}%` }} />
            </div>

            <div className="bg-white rounded-2xl border border-[#e6eee5] p-4 mb-4">
              <span className="inline-flex px-2.5 py-1 rounded-full bg-[#edf7ef] text-[#006e26] text-[10px] font-bold mb-2" style={{ fontFamily: M }}>Thông tin chung</span>
              <h2 className="text-[18px] font-bold text-[#1a1a1a] leading-snug" style={{ fontFamily: F }}>{currentCommonQuestion.title}</h2>
              {currentCommonQuestion.note && (
                <p className="text-[11px] text-[#7a8a79] leading-relaxed mt-2" style={{ fontFamily: F }}>{currentCommonQuestion.note}</p>
              )}
            </div>

            <div className="flex flex-col gap-2.5">
              {currentCommonQuestion.options.map((option, index) => {
                const selected = commonAnswers[currentCommonQuestion.id] === option;
                return (
                  <button key={option} onClick={() => selectCommonAnswer(option)} className={`w-full rounded-2xl border px-4 py-3.5 flex items-start gap-3 text-left transition-all ${selected ? "bg-[#edf7ef] border-[#70ad7f]" : "bg-white border-[#e6eee5] active:bg-[#f5f9f5]"}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black flex-shrink-0 ${selected ? "bg-[#006e26] text-white" : "bg-[#f1f5f1] text-[#607060]"}`} style={{ fontFamily: M }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <p className="text-[13px] text-[#344034] leading-relaxed pt-0.5" style={{ fontFamily: F }}>{option}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {sport && !finished && currentQuestion && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-[#006e26]" style={{ fontFamily: M }}>{SPORT_META[sport].icon} {sport}</span>
              <span className="text-[11px] text-[#7a8a79]" style={{ fontFamily: M }}>Câu {COMMON_QUESTIONS.length + questionIndex + 1}/{COMMON_QUESTIONS.length + questions.length}</span>
            </div>
            <div className="h-2 bg-[#e7eee6] rounded-full overflow-hidden mb-5">
              <div className="h-full bg-[#006e26] rounded-full transition-all" style={{ width: `${((COMMON_QUESTIONS.length + questionIndex + 1) / (COMMON_QUESTIONS.length + questions.length)) * 100}%` }} />
            </div>

            <div className="bg-white rounded-2xl border border-[#e6eee5] p-4 mb-4">
              <div className="mb-2">
                <span className="inline-flex px-2.5 py-1 rounded-full bg-[#edf7ef] text-[#006e26] text-[10px] font-bold" style={{ fontFamily: M }}>{currentQuestion.skill}</span>
              </div>
              <h2 className="text-[18px] font-bold text-[#1a1a1a] leading-snug" style={{ fontFamily: F }}>{currentQuestion.title}</h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {currentQuestion.options.map((option, index) => {
                const value = (index + 1) as AnswerValue;
                const selected = answers[currentQuestion.id] === value;
                return (
                  <button key={option} onClick={() => selectAnswer(value)} className={`w-full rounded-2xl border px-4 py-3.5 flex items-start gap-3 text-left transition-all ${selected ? "bg-[#edf7ef] border-[#70ad7f]" : "bg-white border-[#e6eee5] active:bg-[#f5f9f5]"}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black flex-shrink-0 ${selected ? "bg-[#006e26] text-white" : "bg-[#f1f5f1] text-[#607060]"}`} style={{ fontFamily: M }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <p className="text-[13px] text-[#344034] leading-relaxed pt-0.5" style={{ fontFamily: F }}>{option}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {sport && finished && result && (
          <div>
            <div className="bg-gradient-to-br from-[#006e26] to-[#159447] rounded-3xl p-5 text-white text-center shadow-[0_8px_24px_rgba(0,110,38,0.22)]">
              <div className="text-[34px] mb-2">{SPORT_META[sport].icon}</div>
              <p className="text-[11px] font-semibold text-white/80 uppercase tracking-wider" style={{ fontFamily: M }}>Kết quả tự đánh giá</p>
              <p className="text-[42px] font-black leading-none mt-3" style={{ fontFamily: M }}>{result.level}</p>
              <p className="text-[14px] font-semibold mt-2" style={{ fontFamily: F }}>{result.description}</p>
            </div>

            <div className="mt-4 bg-white rounded-2xl border border-[#e6eee5] p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#edf7ef] flex items-center justify-center text-[20px] flex-shrink-0">💡</div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a1a1a]" style={{ fontFamily: F }}>Gợi ý dành cho bạn</p>
                  <p className="text-[12px] text-[#5f6f5f] leading-relaxed mt-1.5" style={{ fontFamily: F }}>
                    {getRecommendation(sport, result.level)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[#9aaa99] text-center leading-relaxed mt-4 px-3" style={{ fontFamily: F }}>
              Đây là kết quả tự đánh giá, không thay thế kết quả chấm trực tiếp từ chủ sân hoặc huấn luyện viên.
            </p>

            <div className="flex gap-2.5 mt-4">
              <button onClick={restart} className="flex-1 py-3.5 rounded-2xl bg-white border border-[#cfe0cf] text-[#006e26] text-[13px] font-bold" style={{ fontFamily: F }}>Đánh giá môn khác</button>
              <button onClick={onBack} className="flex-1 py-3.5 rounded-2xl bg-[#006e26] text-white text-[13px] font-bold" style={{ fontFamily: F }}>Về hồ sơ</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}