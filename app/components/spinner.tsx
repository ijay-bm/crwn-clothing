interface SpinnerProps {
  small?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small = false }) => {
  return (
    <div
      className={`
        absolute inset-0 h-full w-full flex justify-center items-center z-[1000] backdrop-blur-[3px]
      `}
    >
      <span
        className={`
          inline-block 
          ${small ? "w-[30px] h-[30px]" : "w-[50px] h-[50px]"}
          border-[3px] border-solid border-[#c3c3c3]/60 border-t-[#636767] rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

export default Spinner;
