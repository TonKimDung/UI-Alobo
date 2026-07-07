import svgPaths from "./svg-030o3q4y9i";
import imgImage from "./3ce776f8faf5ca106c34bc29e1fa7e186e4aa644.png";
import imgPlayer from "./f064bd62f744b9fe51b07ead3ff586b487298a40.png";
import imgPlayer1 from "./434851319a870ae87745393db27c3a6d2bc63af8.png";
import imgPlayer2 from "./827f54d4e88c09b90bf5a9631cddfde5d6219c63.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">ALOBOSports</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Home</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6px] relative shrink-0" data-name="Link">
      <div aria-hidden className="absolute border-[#006e26] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Assessments</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Map</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Bookings</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Nav">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative size-full">
        <Heading />
        <Nav />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Log In</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#006e26] content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Register</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function HeaderTopNavigationShell() {
  return (
    <div className="bg-[#f7faf8] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative shrink-0 w-full z-[2]" data-name="Header - Top Navigation Shell">
      <div aria-hidden className="absolute border-[#bccab8] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[64px] relative size-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function OverlayOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex items-start px-[16px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay+OverlayBlur">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">ASSESSMENT COMPLETE</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[48px] text-white tracking-[-0.96px] whitespace-nowrap">
        <p className="leading-[56px]">Xin chúc mừng, Minh!</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px] mb-0">Kỹ năng của bạn đã được ghi nhận. Bạn đã chính thức nâng</p>
        <p className="leading-[24px]">hạng trong cộng đồng ALOBO.</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <OverlayOverlayBlur />
      <Heading1 />
      <Container4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[72px] text-center text-white whitespace-nowrap">
        <p className="leading-[72px]">3.5</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#5ce070] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]">NEW LEVEL</p>
        </div>
        <Container7 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[224px] z-[2]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden className="absolute border-4 border-[rgba(92,224,112,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-[224px] top-0" data-name="Overlay+Shadow" />
      <Container6 />
      <div className="absolute inset-[4px] rounded-[9999px]" data-name="Animated Ring">
        <div aria-hidden className="absolute border-[#7afd8a] border-b-4 border-r-4 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[9px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 9">
        <g id="Container">
          <path d={svgPaths.p1889a500} fill="var(--fill-0, #003E12)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#28b44b] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <Container9 />
          <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#003e12] text-[16px] whitespace-nowrap">
            <p className="leading-[24px]">+0.3 Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0" data-name="Container">
      <Background />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 z-[1]" data-name="Margin">
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col isolate items-center relative shrink-0" data-name="Container">
      <OverlayBorderOverlayBlur />
      <Margin />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function HeroSectionLevelReveal() {
  return (
    <div className="relative rounded-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(161.565deg, rgb(0, 110, 38) 0%, rgb(0, 83, 27) 100%)" }} data-name="Hero Section: Level Reveal">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[48px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Chỉ số kỹ thuật</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Phân tích chi tiết 6 khía cạnh chuyên môn</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[293.91px]" data-name="Container">
      <Heading2 />
      <Container12 />
    </div>
  );
}

function Background1() {
  return (
    <div className="h-[33px] relative shrink-0 w-[38px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 33">
        <g id="Background">
          <rect fill="var(--fill-0, #E6E9E7)" height="33" rx="8" width="38" />
          <path d={svgPaths.p61ea500} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container11 />
        <Background1 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[400px] relative shrink-0 w-[596px]" data-name="image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[400px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Image />
      </div>
    </div>
  );
}

function TechnicalStatsRadar() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.8)] col-[1/span_7] justify-self-stretch relative rounded-[32px] row-1 self-start shrink-0" data-name="Technical Stats Radar">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[43px] pt-[33px] px-[33px] relative size-full">
        <Container10 />
        <Container13 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[20px] w-full">
          <p className="leading-[28px]">Xếp loại kỹ năng</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[22.067px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22.0674">
        <g id="Container">
          <path d={svgPaths.p15881a40} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(0,110,38,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-name="Overlay">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Forehand Power</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Overlay />
      <Container17 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#006e26] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">ELITE</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#ebefed] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Container15 />
          <Background3 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p12df5c00} fill="var(--fill-0, #7C5800)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(124,88,0,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-name="Overlay">
      <Container19 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">{`Speed & Agility`}</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Overlay1 />
      <Container20 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#cc9300] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#473100] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">PRO</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ebefed] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Container18 />
          <Background5 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.012px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0118 20">
        <g id="Container">
          <path d={svgPaths.p1f8cb380} fill="var(--fill-0, #436747)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(67,103,71,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-name="Overlay">
      <Container22 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Court Strategy</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Overlay2 />
        <Container23 />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#c4edc5] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#496d4d] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">ADVANCED</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#ebefed] relative rounded-[12px] shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#006e26] border-l-4 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[20px] pr-[16px] py-[16px] relative size-full">
          <Container21 />
          <Background6 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Background2 />
        <Background4 />
        <BackgroundVerticalBorder />
      </div>
    </div>
  );
}

function SkillBadgeCard() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.8)] relative rounded-[32px] shrink-0 w-full" data-name="Skill Badge Card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[33px] relative size-full">
        <Heading3 />
        <Container14 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] w-full">
          <p>
            <span className="leading-[24px]">{`Bạn chỉ còn thiếu `}</span>
            <span className="[word-break:break-word] font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[24px] text-[#006e26]">150 điểm</span>
            <span className="leading-[24px]">{` để đạt Level 4.0!`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#006e26] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center py-[16px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
          <p className="leading-[24px]">TÌM TRẬN ĐẤU NGAY</p>
        </div>
        <Container25 />
      </div>
    </div>
  );
}

function ActionCard() {
  return (
    <div className="bg-[#e0e3e1] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[32px] shrink-0 w-full" data-name="Action Card">
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[33px] relative size-full">
        <Container24 />
        <Button2 />
      </div>
    </div>
  );
}

function SkillBadgesImprovement() {
  return (
    <div className="col-[8/span_5] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Skill Badges & Improvement">
      <SkillBadgeCard />
      <ActionCard />
    </div>
  );
}

function BentoGridDetailsRadar() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_552px] relative shrink-0 w-full" data-name="Bento Grid: Details & Radar">
      <TechnicalStatsRadar />
      <SkillBadgesImprovement />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">Bảng xếp hạng sân CLB Phú Thọ</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Tháng 10 - 2023</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-[463.11px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading4 />
        <Container27 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Đơn</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Đôi</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#ebefed] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start p-[4px] relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#bccab8] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[33px] pt-[32px] px-[32px] relative size-full">
          <Container26 />
          <Background7 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-[184.63px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">HẠNG</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-[368.83px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">NGƯỜI CHƠI</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-[177.55px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">LEVEL</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-[203.09px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">ĐIỂM SỐ</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-[215.91px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">XU HƯỚNG</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#f1f4f2] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#facc15] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Overlay+Shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[28.5px] pt-[28px] px-[32px] relative shrink-0 w-[184.63px]" data-name="Data">
      <Background8 />
    </div>
  );
}

function Player() {
  return (
    <div className="max-w-[304.8299865722656px] pointer-events-none relative rounded-[9999px] shrink-0 size-[48px]" data-name="Player">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlayer} />
      </div>
      <div aria-hidden className="absolute border-2 border-[#006e26] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Hoàng Nam</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">PRO CHAMPION</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[83.77px]" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center pl-[32px] relative shrink-0 w-[336.83px]" data-name="Data">
      <Player />
      <Container28 />
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[38px] pl-[63.99px] pr-[32px] pt-[37.5px] relative shrink-0 w-[209.54px]" data-name="Data">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">5.0</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[38px] pt-[37.5px] px-[32px] relative shrink-0 w-[203.09px]" data-name="Data">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">2,450</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="h-[79.9px] relative shrink-0 w-[215.91px]" data-name="Data">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.91 79.9">
        <g id="Data">
          <path d={svgPaths.p1811d800} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function RowTop() {
  return (
    <div className="bg-[rgba(0,110,38,0.05)] content-stretch flex items-center justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row - Top 1">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#cbd5e1] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[184.63px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[32px] py-[28.5px] relative size-full">
        <BackgroundShadow />
      </div>
    </div>
  );
}

function Player1() {
  return (
    <div className="max-w-[304.8299865722656px] pointer-events-none relative rounded-[9999px] shrink-0 size-[48px]" data-name="Player">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlayer1} />
      </div>
      <div aria-hidden className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Thùy Linh</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[336.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[32px] relative size-full">
        <Player1 />
        <Container31 />
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[209.54px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[63.99px] pr-[32px] py-[38px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">4.5</p>
        </div>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[203.09px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[32px] py-[38px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">2,120</p>
        </div>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="h-[80.4px] relative shrink-0 w-[215.91px]" data-name="Data">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.91 80.4">
        <g id="Data">
          <path d={svgPaths.p3b01d500} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function RowTop1() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row - Top 2">
      <div aria-hidden className="absolute border-[#bccab8] border-solid border-t inset-0 pointer-events-none" />
      <Data5 />
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#006e26] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Overlay+Shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">12</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[184.63px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[32px] py-[28.5px] relative size-full">
        <Background9 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#7afd8a] content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Border">
      <div aria-hidden className="absolute border-2 border-[#006e26] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[normal]">M</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="absolute bg-[#006e26] content-stretch flex items-start left-0 px-[8px] py-[2px] rounded-[4px] top-[19px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[normal]">NEW LEVEL</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[34px] relative shrink-0 w-[76.23px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] left-0 text-[#181c1b] text-[16px] top-[10.5px] whitespace-nowrap">
        <p className="leading-[normal]">Minh (Bạn)</p>
      </div>
      <Background10 />
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[336.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[32px] relative size-full">
        <BackgroundBorder />
        <Container32 />
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[209.54px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[63.99px] pr-[32px] py-[38px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">3.5</p>
        </div>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[203.09px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[32px] py-[38px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">1,680</p>
        </div>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="h-[86.4px] relative shrink-0 w-[215.91px]" data-name="Data">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.91 86.4">
        <g id="Data">
          <path d={svgPaths.p2adfcb00} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function RowCurrentPlayerHighlight() {
  return (
    <div className="bg-[rgba(196,237,197,0.2)] content-stretch flex items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row - Current Player (Highlight)">
      <div aria-hidden className="absolute border-[#bccab8] border-solid border-t inset-0 pointer-events-none" />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
      <Data14 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[normal]">4</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[184.63px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28px] pt-[28.5px] px-[32px] relative size-full">
        <BackgroundBorder1 />
      </div>
    </div>
  );
}

function Player2() {
  return (
    <div className="max-w-[304.8299865722656px] pointer-events-none relative rounded-[9999px] shrink-0 size-[48px]" data-name="Player">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlayer2} />
      </div>
      <div aria-hidden className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Đức Anh</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[336.83px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[32px] relative size-full">
        <Player2 />
        <Container33 />
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[209.54px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[37.5px] pl-[63.99px] pr-[32px] pt-[38px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">4.2</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[203.09px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[37.5px] pt-[38px] px-[32px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
          <p className="leading-[normal]">1,890</p>
        </div>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="h-[79.9px] relative shrink-0 w-[215.91px]" data-name="Data">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.91 79.9">
        <g id="Data">
          <path d={svgPaths.p271c2580} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function RowTop2() {
  return (
    <div className="content-stretch flex items-center justify-center pt-px relative shrink-0 w-full" data-name="Row - Top 4">
      <div aria-hidden className="absolute border-[#bccab8] border-solid border-t inset-0 pointer-events-none" />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <RowTop />
      <RowTop1 />
      <RowCurrentPlayerHighlight />
      <RowTop2 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <Header />
        <Body />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Xem toàn bộ bảng xếp hạng (150+ người chơi)</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f1f4f2] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[24px] relative size-full">
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function LeaderboardSection() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.8)] relative rounded-[32px] shrink-0 w-full" data-name="Leaderboard Section">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <HorizontalBorder />
        <Table />
        <Background11 />
      </div>
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[inherit] px-[64px] py-[32px] relative size-full">
        <HeroSectionLevelReveal />
        <BentoGridDetailsRadar />
        <LeaderboardSection />
      </div>
    </div>
  );
}

export default function KtQuBngXpHng() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 250, 248) 0%, rgb(247, 250, 248) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Kết quả & Bảng xếp hạng">
      <HeaderTopNavigationShell />
      <Main />
    </div>
  );
}