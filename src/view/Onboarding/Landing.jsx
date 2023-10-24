import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/img/elon-bg.png";
import { ReactComponent as Logo } from "../../assets/svg/logos.svg";
import { CustomButton } from "../../components/buttons/CustomButton";
import CenterModal from "../../components/Modal/CenterModal";
import { TextInput } from "../../components/reusables/TextInput";
import { useFormik } from "formik/dist";
import { coverLetterValidationSchema } from "../../utils/validationSchema/coverletter.validations";
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip } from "recharts";
import PageLoader from "../../components/PageLoader";
import { Helmet } from "react-helmet-async";
import { TypeAnimation } from "react-type-animation";

const Landing = () => {
  const [modal, toggleModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const dt = [
    { name: "Airdrop 35%", value: 35 },
    { name: "Presale 20%", value: 20 },
    { name: "Team & future team 5%", value: 5 },
    { name: "Liquidity pool 25%", value: 25 },
    { name: "Investors 10%", value: 10 },
    { name: "Charity 5%", value: 5 },
  ];

  // Calculate the total value
  const totalValue = dt.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages and update the data array
  const dataWithPercentages = dt.map((item) => ({
    name: item.name,
    value: (item.value / totalValue) * 100, // Calculate the percentage
  }));

  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      addy: "",
    },

    onSubmit: async () => {
      const payload = {
        ...values,
      };

      console.log(payload);
      toggleModal(true);
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

  console.log(modal);

  return (
    <>
      <Helmet>
        <title>$dsb</title>
        <meta
          name="description"
          content="Generate your cover letter for any job role in seconds. Simple, safe and secure"
        />
        <link rel="canonical" href="https://coverjobs.vercel.app/" />
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
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-5">
              <div data-aos="fade-left" data-aos-duration="1000">
                <CustomButton
                  containerVariant="py-2 px-5 text-xs rounded-xl flex justify-center"
                  buttonVariant="secondary"
                  labelText={"Tweet"}
                />
              </div>
              <div data-aos="fade-up" data-aos-duration="1000">
                <CustomButton
                  containerVariant="py-2 px-5 text-xs rounded-xl flex justify-center"
                  buttonVariant="secondary"
                  labelText={"View X (Formerly Twitter)"}
                />
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

        <div className="font-verdana text-white mt-40 text-sm text-center">
          Scroll down to Find out more
        </div>

        <div className="font-syncopate font-bold text-white mx-10 md:mx-40 mt-40 text-xs text-center">
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

        <div className=" mt-10 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataWithPercentages}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="rgba(136, 132, 216, 0.6)"
                label
              />
              {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-40 w-full text-center pb-5">
          <p className="text-white font-orbitron text-sm">
            Token utility? how about I shoot you in the face.
          </p>
        </div>
      </div>

      {modal && (
        <CenterModal
          title="Status"
          background={Hero}
          handleClose={() => toggleModal(false)}
        >
          <div className="text-center font-semibold text-2xl text-white">
            You are Eligible
          </div>
        </CenterModal>
      )}
    </>
  );
};

export default Landing;
