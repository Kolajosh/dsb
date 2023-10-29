import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/img/elon-bg.jpg";
import { ReactComponent as SuccessIcon } from "../../assets/svg/success-solid.svg";
import { ReactComponent as ErrorIcon } from "../../assets/svg/error-icon.svg";
import { CustomButton } from "../../components/buttons/CustomButton";
import CenterModal from "../../components/Modal/CenterModal";
import { TextInput } from "../../components/reusables/TextInput";
import { useFormik } from "formik/dist";
import { coverLetterValidationSchema } from "../../utils/validationSchema/coverletter.validations";
import PageLoader from "../../components/PageLoader";
import { Helmet } from "react-helmet-async";
import { TypeAnimation } from "react-type-animation";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import useApiRequest from "../../utils/hooks/useApiRequest";
import { checkAddress } from "../../utils/apiURLs/requests";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import useToggle from "../../utils/hooks/useToggle";

const Landing = () => {
  const [modal, toggleModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, toggleLoading] = useToggle();
  const makeRequest = useApiRequest();

  const tweetText =
    "I have secured a spot to receive a portion of the $dsb airdrop, I am super excited. It may not make sense to you now, but it definitely will later. I trust @dontshootback and I am ready for what is next";
  const twitterShareURL = `https://x.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;

  const data = [
    { title: "Airdrop", value: 35, color: "rgba(136, 132, 216, 0.7)" },
    { title: "Presale", value: 20, color: "rgba(255, 99, 71, 0.7)" },
    {
      title: "Team & future team",
      value: 5,
      color: "rgba(128, 128, 128, 0.7)",
    },
    { title: "Liquiduty pool", value: 25, color: "rgba(70, 130, 180, 0.7)" },
    { title: "Investors", value: 10, color: "rgba(128, 0, 128, 0.7)" },
    { title: "Charity", value: 5, color: "rgba(255, 165, 0, 0.7)" },
  ];

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
    color: "white",
    fill: "white",
  };

  const shiftSize = 7;

  const formik = useFormik({
    initialValues: {
      addy: "",
    },

    onSubmit: async () => {
      toggleLoading();
      const payload = {
        walletAddress: values?.addy,
      };

      try {
        const response = await makeRequest.post(checkAddress, payload);
        toggleLoading();
        if (response?.status === 200) {
          setResponseMessage(response?.data);
          toggleModal(true);
        }
      } catch (error) {
        toggleLoading();
        ToastNotify({
          type: "error",
          message: "Something went wrong, Try again later",
          position: "top-right",
        });
      }
    },

    validationSchema: coverLetterValidationSchema,
  });

  const {
    handleChange,
    handleBlur,
    errors,
    values,
    handleSubmit,
    dirty,
    isValid,
  } = formik;

  useEffect(() => {
    // disconnectMetaMask();
    localStorage.clear();
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <Helmet>
        <title>$dsb</title>
        <meta name="description" content="$dsb token wallet checker" />
        <link rel="canonical" href="https://dontshootback.xyz" />
      </Helmet>
      <div
        style={{ background: `url(${Hero})`, backgroundSize: "cover" }}
        className="relative p-10 bg-black text-black font-jarkata w-full h-auto"
      >
        {/* <img src={Hero} className="w-full h-screen object-cover" alt="hero" /> */}
        <div className="relative w-full">
          <div className="">
            <div
              className=" text-center text-2xl md:text-6xl font-syncopate font-bold"
              style={{
                background: "linear-gradient(to right, blue, pink)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              $dsb
            </div>
            <div className="text-white mx-10 text-sm text-center font-semibold font-orbitron">
              <TypeAnimation
                sequence={[
                  "discord to be open after launch 🚀",
                  3000,
                  "99,999,999 total supply. 9999 to be burnt every 9 hours after launch.",
                  5000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </div>
            <div className="mt-10 mx-10 md:mx-20 ">
              <div
                htmlFor=""
                className="text-white text-center md:text-left mb-2 font-orbitron text-xs font-medium"
              >
                Check Wallet Status
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-5 ">
                <TextInput
                  name="addy"
                  placeHolder="Input wallet address here"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values?.addy}
                  hasError={errors?.addy}
                />
                <CustomButton
                  handleClick={() => handleSubmit()}
                  labelText={"Search"}
                  isDisabled={!(dirty && isValid)}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-5">
              <div data-aos="fade-up" data-aos-duration="1000">
                <a
                  href="https://twitter.com/dontshootback"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="bg-[#FFFFFF] border-[1.5px] bg-opacity-[10%] border-[#8DA4EA] text-white py-3 cursor-pointer rounded-xl text-xs px-5">
                    View on X (Formerly Twitter)
                  </div>
                </a>
              </div>
              <div data-aos="fade-right" data-aos-duration="1000">
                <CustomButton
                  containerVariant="py-2 px-5 text-xs rounded-xl flex justify-center"
                  buttonVariant="secondary"
                  labelText={"Discord Soon"}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-sm text-center mt-20 font-verdana text-white"
        >
          I think its possible for ordinary people to choose to be extraordinary
          <br />- Elon Musk
        </div>

        <div className="font-verdana animate-bounce text-white mt-20 text-sm text-center">
          Scroll down to Find out more
        </div>

        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="font-syncopate font-bold text-white mx-10 md:mx-40 mt-40 text-xs text-center"
        >
          $dsb dontshootback is a thought born in the heart of the bear market,
          with careful planning for over a year. it is a token set on self
          destruct, to take the bears by surprise. <br />
          <br /> Total supply of tokens is 99,999,999 and 9999 will be burnt
          every 9 hours after launch. <br /> <br /> $dsb is a meme cum gamefi
          token, where tokens will be integrated in-game, and holders are
          provided with replicated tokens to be utilized in the game, with a
          fully automated play-to-earn mechanism. <br /> <br /> tokens will be
          earned, burned, traded as gameplay progresses, as the dontshootback
          ecosystem doesn’t end at $dsb, more token skins for various levels
          will be released, and $dsb will be the parent token. <br /> <br />
          Eligible wallets for the first dontshootback $dsb airdrop will receive
          39,999 tokens each and that begins their journey to the world of DSB.
          <br /> <br /> Will you join in?
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10"> */}
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="flex justify-center  items-center mt-10"
        >
          <PieChart
            data={data}
            radius={pieChartDefaultProps.radius - shiftSize}
            style={{ height: "400px", width: "auto" }}
            // label={({ dataEntry }) => dataEntry.value}
            lineWidth={20} // Set the width of the donut chart (adjust as needed)
            segmentsStyle={{ transition: "stroke", cursor: "pointer" }}
            // labelStyle={{
            //   ...defaultLabelStyle,
            // }}
          />
          <div
            data-aos="zoom-in-down"
            data-aos-duration="1000"
            className="text-xs text-white space-y-2"
          >
            <label className="text-white font-verdana text-sm">
              Measured in %
            </label>

            <div>
              {" "}
              <span
                className="text-2xl"
                style={{ color: "rgba(136, 132, 216, 0.7)" }}
              >
                ●{" "}
              </span>
              Airdrop - 35%
            </div>
            <div>
              {" "}
              <span
                className="text-2xl"
                style={{ color: "rgba(255, 99, 71, 0.7)" }}
              >
                ●{" "}
              </span>
              Presale - 20%
            </div>
            <div>
              {" "}
              <span
                className="text-2xl"
                style={{ color: "rgba(128, 128, 128, 0.7)" }}
              >
                ●{" "}
              </span>
              Teams & future team - 5%
            </div>
            <div>
              {" "}
              <span
                className="text-2xl"
                style={{ color: "rgba(70, 130, 180, 0.7)" }}
              >
                ●{" "}
              </span>
              Liquidity pool - 25%
            </div>
            <div>
              {" "}
              <span
                className="text-2xl"
                style={{ color: "rgba(128, 0, 128, 0.7)" }}
              >
                ●{" "}
              </span>
              Investors - 10%
            </div>
            <div>
              {" "}
              <span
                className="text-2xl"
                style={{ color: "rgba(255, 165, 0, 0.7)" }}
              >
                ●{" "}
              </span>
              Charity - 5%
            </div>
          </div>
        </div>

        <div
          data-aos="zoom-in-down"
          data-aos-duration="1000"
          className="text-center mt-10"
        >
          <div className="text-white space-y-5">
            <div className="text-xs space-y-2 font-syncopate font-bold">
              <div> No Taxes, no bullshit, just Mars</div>
              <div> Contract renounced: Yes</div>
              <div> Liquidity locked: Yes, Until Elon lands on Mars</div>
              <div> LP tokens are burnt every 9 hours</div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-full text-center pb-5">
          <p className="text-white font-orbitron text-sm">
            Token utility? how about I shoot you in the face?.
          </p>
        </div>
      </div>

      {modal && (
        <CenterModal
          title="Status"
          background={Hero}
          handleClose={() => toggleModal(false)}
        >
          <div className="text-center font-semibold text-lg text-white">
            <div className="flex justify-center mb-5">
              {responseMessage?.exists ? (
                <SuccessIcon style={{ width: "50px", height: "50px" }} />
              ) : (
                <ErrorIcon style={{ width: "50px", height: "50px" }} />
              )}
            </div>
            {responseMessage?.message}
            {responseMessage?.exists && (
              <div className="flex justify-center mt-10">
                <a
                  href={twitterShareURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-[#FFFFFF] border-[1.5px] bg-opacity-[10%] border-[#8DA4EA] text-white py-3 cursor-pointer rounded-xl text-xs px-5">
                    Tweet
                  </div>
                </a>
              </div>
            )}
          </div>
        </CenterModal>
      )}
    </>
  );
};

export default Landing;
