import svgPaths from "./svg-4y4briqem8";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#006e26] text-[32px] tracking-[-0.8px] whitespace-nowrap">
        <p className="leading-[40px]">ALOBOSports</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Help</p>
      </div>
    </div>
  );
}

function HeaderTopNavBarShellSuppressionNotShownOnRegistrationAsItIsATransactionalSubPage() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(247,250,248,0.8)] content-stretch flex h-[64px] items-center justify-between left-0 pl-[64px] pr-[63.99px] top-0 w-[1280px] z-[3]" data-name="Header - TopNavBar (Shell Suppression: Not shown on Registration as it is a transactional sub-page)">
      <Container />
      <Link />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[32px] text-center whitespace-nowrap">
        <p className="leading-[40px]">Create Your Account</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Elevate your game. Join the premier racquet sports network.</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <Heading />
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p3189a600} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Label">
      <Container3 />
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">FULL NAME</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Enter your full name</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f1f4f2] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[15px] pt-[14px] px-[17px] relative size-full">
          <Container4 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FullName() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Full Name">
      <Label />
      <Input />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[12px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
        <g id="Container">
          <path d={svgPaths.p37f50280} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Label">
      <Container6 />
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">EMAIL ADDRESS</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">name@example.com</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f1f4f2] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[15px] pt-[14px] px-[17px] relative size-full">
          <Container7 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[13.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
        <g id="Container">
          <path d={svgPaths.pb3c9680} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Label">
      <Container9 />
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">PHONE NUMBER</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">+1 (555) 000-0000</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f1f4f2] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[15px] pt-[14px] px-[17px] relative size-full">
          <Container10 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Label2 />
      <Input2 />
    </div>
  );
}

function EmailPhoneNumberGrid() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_76px] relative shrink-0 w-full" data-name="Email & Phone Number Grid">
      <Container5 />
      <Container8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16.551px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.5505">
        <g id="Container">
          <path d={svgPaths.p3dd1ed40} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Label">
      <Container11 />
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">PRIMARY ROLE</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="image">
          <path d="M7.2 9.6L12 14.4L16.8 9.6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[16px] w-full">
          <p className="leading-[24px]">Select your role</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#f1f4f2] relative rounded-[8px] shrink-0 w-full" data-name="Options">
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[17px] py-[13px] relative size-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip pl-[409px] pr-[9px] py-[13px] relative rounded-[inherit] size-full">
            <Image />
          </div>
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center px-[16px] right-0 top-0" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Options />
      <Container14 />
    </div>
  );
}

function RoleSelectionAsymmetricAccent() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Role Selection (Asymmetric Accent)">
      <Label3 />
      <Container12 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[15.75px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15.75">
        <g id="Container">
          <path d={svgPaths.p2bea3800} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Label">
      <Container16 />
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">PASSWORD</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">Min. 8 characters</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f1f4f2] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[15px] pt-[14px] px-[17px] relative size-full">
          <Container18 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[15px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 15">
        <g id="Container">
          <path d={svgPaths.p3e801e80} fill="var(--fill-0, #3E4A3C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bottom-[4.5px] content-stretch flex items-center px-[16px] py-[13px] right-0 top-[4.5px]" data-name="Button">
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input3 />
      <Button />
    </div>
  );
}

function Password() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Password">
      <Label4 />
      <Container17 />
    </div>
  );
}

function InputMargin() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[4px] relative shrink-0 w-[20px]" data-name="Input:margin">
      <div className="bg-white relative rounded-[4px] shrink-0 size-[20px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#bccab8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function TCCheckbox() {
  return (
    <div className="content-stretch flex gap-[12px] items-start py-[8px] relative shrink-0 w-full" data-name="T&C Checkbox">
      <InputMargin />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[17.5px]">{`I agree to the `}</span>
          <span className="[word-break:break-word] font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[17.5px] text-[#006e26]">Terms of Service</span>
          <span className="leading-[17.5px]">{` and `}</span>
          <span className="[word-break:break-word] font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[17.5px] text-[#006e26]">Privacy Policy</span>
          <span className="leading-[17.5px]">.</span>
        </p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1a406200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function SubmitButton() {
  return (
    <div className="bg-[#006e26] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center justify-center py-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Submit Button">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white whitespace-nowrap">
        <p className="leading-[28px]">Register</p>
      </div>
      <Container20 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[8px] relative shrink-0 w-full" data-name="Form">
      <FullName />
      <EmailPhoneNumberGrid />
      <RoleSelectionAsymmetricAccent />
      <Password />
      <TCCheckbox />
      <SubmitButton />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Hanken_Grotesk:Regular',sans-serif] gap-[4.01px] items-start justify-center leading-[0] relative size-full text-[16px] text-center whitespace-nowrap">
        <div className="flex flex-col font-normal justify-center relative shrink-0 text-[#3e4a3c]">
          <p className="leading-[24px]">{`Already have an account? `}</p>
        </div>
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-[#006e26]">
          <p className="leading-[24px]">Login</p>
        </div>
      </div>
    </div>
  );
}

function RedirectToLogin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[33px] relative shrink-0 w-full" data-name="Redirect to Login">
      <div aria-hidden className="absolute border-[rgba(188,202,184,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-start p-[48px] relative size-full">
        <Header />
        <Form />
        <RedirectToLogin />
      </div>
    </div>
  );
}

function RegistrationCardContainer() {
  return (
    <div className="bg-white max-w-[540px] relative rounded-[12px] shrink-0 w-[540px]" data-name="Registration Card Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] overflow-clip p-px relative rounded-[inherit] size-full">
        <div className="bg-gradient-to-r from-[#006e26] h-[8px] relative shrink-0 to-[#28b44b] w-full" data-name="Branding/Accent Header" />
        <Container1 />
      </div>
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Container">
          <path d={svgPaths.p1c671000} fill="var(--fill-0, #473100)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#cc9300] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['JetBrains_Mono:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#7c5800] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">MEMBER PERKS</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Pro Performance</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[152px]" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Background />
        <Container23 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[14px] w-full">
          <p className="leading-[21px] mb-0">Registering gives you instant access</p>
          <p className="leading-[21px] mb-0">to advanced performance tracking</p>
          <p className="leading-[21px] mb-0">and court scheduling across our</p>
          <p className="leading-[21px]">network.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#f7faf8] bottom-[36px] content-stretch flex flex-col items-start left-0 px-[13px] py-[5px] rounded-[9999px] top-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#436747] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Global Stats</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="absolute bg-[#f7faf8] bottom-[36px] content-stretch flex flex-col items-start left-[100.22px] px-[13px] py-[5px] rounded-[9999px] top-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#436747] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Event Pass</p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="absolute bg-[#f7faf8] bottom-0 content-stretch flex flex-col items-start left-0 px-[13px] py-[5px] rounded-[9999px] top-[36px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#436747] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Priority Booking</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <BackgroundBorder1 />
        <BackgroundBorder2 />
        <BackgroundBorder3 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e0e3e1] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(188,202,184,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
        <Container21 />
        <Container26 />
        <Container27 />
      </div>
    </div>
  );
}

function DecorativeFloatingElementRight() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[35.97%_10%_35.97%_68.13%] items-start max-w-[280px]" data-name="Decorative Floating Element (Right)">
      <BackgroundBorder />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Main">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center pb-[64px] pt-[96px] px-[16px] relative size-full">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,110,38,0.05)] blur-[32px] left-1/2 rounded-[9999px] size-[800px] top-[calc(50%-0.28px)]" data-name="Atmospheric Background Element" />
          <div className="absolute bg-[rgba(124,88,0,0.1)] blur-[32px] right-0 rounded-[9999px] size-[256px] top-0" data-name="Overlay+Blur" />
          <RegistrationCardContainer />
          <DecorativeFloatingElementRight />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#181c1b] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">© 2024 ALOBOSports. Precision performance for every court.</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Support</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Status</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk:Regular',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3e4a3c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Contact</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[24px] h-[24px] items-start relative shrink-0" data-name="Nav">
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function SimpleTransactionalFooter() {
  return (
    <div className="bg-[rgba(224,227,225,0.5)] relative shrink-0 w-full z-[1]" data-name="Simple Transactional Footer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[64px] py-[32px] relative size-full">
          <Container28 />
          <Nav />
        </div>
      </div>
    </div>
  );
}

export default function DangKyTaiKhonAloboSports() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 250, 248) 0%, rgb(247, 250, 248) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Đăng ký tài khoản - ALOBOSports">
      <HeaderTopNavBarShellSuppressionNotShownOnRegistrationAsItIsATransactionalSubPage />
      <Main />
      <SimpleTransactionalFooter />
    </div>
  );
}