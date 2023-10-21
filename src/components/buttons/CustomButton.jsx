import Preloader from "../mics/Preloader";

export const CustomButton = ({
  labelText,
  handleClick,
  variant = "font-medium",
  containerVariant = "py-2 px-5 rounded-xl flex justify-center",
  buttonVariant = "primary",
  isDisabled = false,
  isLoading = false,
  icon,
}) => {
  const primaryColor = "white"; // Change this to your preferred shade of black
  const secondaryColor = "#"; // Change this to your preferred secondary color

  return (
    <button
      type="submit"
      onClick={() => handleClick()}
      className={`${variant} shadow-md ${
        isDisabled
          ? `${
              buttonVariant === "primary" &&
              `bg-gray-600 text-[#fff] cursor-not-allowed py-3`
            } ${
              buttonVariant === "secondary" &&
              `border-[1.5px] border-black bg-opacity-50 text-[${secondaryColor}] cursor-not-allowed py-3`
            }`
          : `${
              buttonVariant === "primary" &&
              `bg-${primaryColor} hover:bg-${primaryColor} text-black bg-opacity-[50%] py-3 border-[1.5px] border-[#8DA4EA] cursor-pointer`
            } ${
              buttonVariant === "secondary" &&
              `bg-[#FFFFFF] border-[1.5px] bg-opacity-[10%] border-[#8DA4EA] text-white py-3 cursor-pointer`
            }`
      } 
      ${containerVariant}`}
      disabled={isDisabled}
    >
      <div className="flex items-center">
        {icon?.active && (
          <div className={`${icon.variant}`}>{icon.preview}</div>
        )}
        {isLoading ? <Preloader variant="w-6 h-6" /> : labelText}
      </div>
    </button>
  );
};
