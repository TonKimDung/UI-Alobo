import svgPaths from "./svg-iuay7jdndb";
import imgPlayerAvatar from "./9ec65ba5bc18f95ecf75525499cadae3b8f8dbff.png";

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
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
        <Container1 />
        <Nav />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Log In</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#006e26] content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Register</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function HeaderTopNavigationSharedComponentIntegration() {
  return (
    <div className="bg-[#f7faf8] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative shrink-0 w-full z-[2]" data-name="Header - Top Navigation (Shared Component Integration)">
      <div aria-hidden className="absolute border-[#bccab8] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[64px] relative size-full">
          <Container />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">EVALUATION SESSION</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[48px] tracking-[-0.96px] whitespace-nowrap">
        <p className="leading-[56px]">Chấm điểm Vận động viên</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Buổi đánh giá kỹ thuật Pickleball định kỳ - Sân A1</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[547.36px]" data-name="Container">
      <Container4 />
      <Heading />
      <Container7 />
    </div>
  );
}

function PlayerAvatar() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[64px]" data-name="Player Avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlayerAvatar} />
      </div>
      <div aria-hidden className="absolute border-2 border-[#006e26] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <PlayerAvatar />
        <div className="absolute bg-[#006e26] bottom-0 right-0 rounded-[9999px] size-[16px]" data-name="Background+Border">
          <div aria-hidden className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#c4edc5] content-stretch flex items-start left-0 px-[8px] py-[4px] rounded-[4px] top-[24px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#496d4d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">ID: #ATH-8821</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[44px] relative shrink-0 w-[180.14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] left-0 text-[#181c1b] text-[20px] top-[14px] whitespace-nowrap">
          <p className="leading-[28px]">Nguyễn Minh Hoàng</p>
        </div>
        <Background />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#ebefed] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[16px] items-center p-[17px] relative rounded-[12px] shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container8 />
      <Container9 />
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Dashboard Header">
      <Container3 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Overlay() {
  return (
    <div className="h-[38.067px] relative shrink-0 w-[36px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 38.0674">
        <g id="Overlay">
          <rect fill="var(--fill-0, #006E26)" fillOpacity="0.1" height="38.0674" rx="8" width="36" />
          <path d={svgPaths.p92e8100} fill="var(--fill-0, #006E26)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Tiêu chí Kỹ thuật</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Overlay />
        <Heading1 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p3dc33e00} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] opacity-60 relative shrink-0 text-[#3e4a3c] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">(Weight 30%)</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Giao bóng (Serve)</p>
      </div>
      <Container13 />
      <Margin />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(0,110,38,0.1)] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">75</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <Overlay1 />
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[811.5px] pr-[270.5px] relative size-full">
        <div className="bg-[#006e26] relative rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,110,38,0.3)] shrink-0 size-[20px]" data-name="Background+Shadow" />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[-7px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#e0e3e1] h-[6px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <Container14 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">YẾU</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">TRUNG BÌNH</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">KHÁ</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">CHUYÊN NGHIỆP</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Serving() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Serving">
      <Container12 />
      <Input />
      <Container16 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p3dc33e00} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] opacity-60 relative shrink-0 text-[#3e4a3c] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">(Weight 40%)</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Phông (Groundstrokes)</p>
      </div>
      <Container22 />
      <Margin1 />
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(0,110,38,0.1)] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">60</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Overlay2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[649.19px] pr-[432.81px] relative size-full">
        <div className="bg-[#006e26] relative rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,110,38,0.3)] shrink-0 size-[20px]" data-name="Background+Shadow" />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[-7px]" data-name="Container">
      <Container24 />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#e0e3e1] h-[6px] relative rounded-[5px] shrink-0 w-full" data-name="Input">
      <Container23 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">YẾU</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">TRUNG BÌNH</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">KHÁ</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">CHUYÊN NGHIỆP</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Groundstrokes() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Groundstrokes">
      <Container21 />
      <Input1 />
      <Container25 />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p3dc33e00} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] opacity-60 relative shrink-0 text-[#3e4a3c] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">(Weight 30%)</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Volley (Bắt lưới)</p>
      </div>
      <Container31 />
      <Margin2 />
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(0,110,38,0.1)] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">80</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Overlay3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Button">
          <path d={svgPaths.p3e30af00} fill="var(--fill-0, #FFBA20)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Button">
          <path d={svgPaths.p3e30af00} fill="var(--fill-0, #FFBA20)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Button">
          <path d={svgPaths.p3e30af00} fill="var(--fill-0, #FFBA20)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Button">
          <path d={svgPaths.p3e30af00} fill="var(--fill-0, #FFBA20)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Button">
          <path d={svgPaths.p3e30af00} fill="var(--fill-0, #BCCAB8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function StarSelectionLogic() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative self-stretch shrink-0" data-name="Star Selection logic">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Italic',sans-serif] font-normal italic justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Phản xạ nhanh, xử lý gọn.</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <StarSelectionLogic />
      <Container33 />
    </div>
  );
}

function Volley() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Volley">
      <Container30 />
      <Container32 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[40px] items-start relative size-full">
        <Serving />
        <Groundstrokes />
        <Volley />
      </div>
    </div>
  );
}

function BentoGridAssessmentLayoutSectionColumn1KThutTechnical() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.9)] relative rounded-[16px] shrink-0 w-full" data-name="Bento Grid Assessment Layout → Section - Column 1: Kỹ Thuật (Technical)">
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[25px] pt-[45px] px-[25px] relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
        <g id="Container">
          <path d={svgPaths.p1b961100} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Nhận xét của Chủ sân (Huấn luyện viên)</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container35 />
        <Heading2 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[24px]">Nhập thêm nhận xét về phong độ, thái độ thi đấu hoặc các lưu ý đặc biệt khác...</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white h-[128px] relative rounded-[12px] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-auto rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center p-[17px] relative size-full">
          <Container36 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function FeedbackSection() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.9)] relative rounded-[16px] shrink-0 w-full" data-name="Feedback Section">
      <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container34 />
        <Textarea />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p27cfa400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#006e26] content-stretch flex gap-[11.99px] items-center justify-center py-[20px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <Container38 />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white whitespace-nowrap">
        <p className="leading-[28px]">{`Tính Điểm (Thang 100) & Hoàn tất`}</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Dữ liệu sẽ được lưu vào hệ thống ALOBOSports ngay lập tức.</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start max-w-[448px] pb-[8px] pt-[20px] px-[8px] relative shrink-0 w-[448px]" data-name="Container">
      <Button7 />
      <Container39 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[inherit] px-[64px] py-[48px] relative size-full">
          <DashboardHeader />
          <BentoGridAssessmentLayoutSectionColumn1KThutTechnical />
          <FeedbackSection />
          <Container37 />
        </div>
      </div>
    </div>
  );
}

export default function ChmDimTheoTieuChiThitLpChSan() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[47px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 247, 245) 0%, rgb(244, 247, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Chấm điểm theo tiêu chí thiết lập - Chủ sân">
      <HeaderTopNavigationSharedComponentIntegration />
      <Main />
    </div>
  );
}