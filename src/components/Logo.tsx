function Logo() {
  return (
    <div>
      <div className="cursor-pointer flex-row  pt-[72px] 2xl:top-[92px] px-[50px]">
        <img
          src={"/" + "img/greenLogoTWC.svg"}
          alt="logo"
          width={170}
          height={55}
          className="mb-[6px] 2xl:h-[32px] 2xl:w-[96px]"
        />
        <img
          className="mb-[6px] 2xl:h-[32px] 2xl:w-[96px]"
          src={"/" + "img/greenlogo.svg"}
          alt="logo"
          width={319}
          height={142}
        />
      </div>
    </div>
  );
}

export default Logo;
