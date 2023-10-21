import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/img/elon-bg.png";
import { ReactComponent as Logo } from "../../assets/svg/logos.svg";
import { CustomButton } from "../../components/buttons/CustomButton";
import CenterModal from "../../components/Modal/CenterModal";
import { TextInput } from "../../components/reusables/TextInput";
import { useFormik } from "formik/dist";
import { coverLetterValidationSchema } from "../../utils/validationSchema/coverletter.validations";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import PageLoader from "../../components/PageLoader";
import { Helmet } from "react-helmet-async";
import { TypeAnimation } from "react-type-animation";

const Landing = () => {

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

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
    { name: "Airdrop", value: 35 },
    { name: "Presale", value: 20 },
    { name: "Team & future team", value: 5 },
    { name: "Liquidity pool", value: 25 },
    { name: "Investors", value: 10 },
    { name: "Charity", value: 5 },
  ];

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
                  labelText={"View Twitter"}
                />
              </div>
              <div data-aos="fade-right" data-aos-duration="1000">
                <CustomButton
                  containerVariant="py-2 px-5 text-xs rounded-xl flex justify-center"
                  buttonVariant="secondary"
                  labelText={"Discord Soon 🔜"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="font-verdana text-white mt-40 text-sm text-center">
          Scroll down to Find out more
        </div>

        <div className="font-syncopate font-bold text-white mx-10 md:mx-40 mt-40 text-xs text-center">
          $dsb dontshootback is a thought born in heart of the bear market, with
          careful planning for over a year. it is a token set on self destruct,
          to take the bears by surprise. <br />
          <br /> Total supply of tokens is 99,999,999 and 9999 will be burnt
          every 9 hours after launch. <br /> <br /> $dsb is a meme cum gamefi
          token, where tokens will be integrated in-game, and holders are
          provided with replicated tokens to be utilized in the game, with a
          fully automated play-to-earn mechanism. <br /> <br /> tokens will be
          earned, burned, traded as gameplay progresses, as the dontshootback
          ecosystem doesn’t end at $dsb, more token skins for various levels
          will be released, and $dsb will be the parent token. <br /> <br />
          Eligible wallets for the first dontshootback $dsb airdrop will receive
          39,999 tokens each and that begins their journey to the world of DSB.{" "}
          <br /> <br /> Will you join in?
        </div>

        <div className=" mt-10 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={800} height={800}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={dt}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-40 w-full text-center pb-5">
          <p className="text-white font-orbitron text-sm">
            Token utility? how about I shoot you in the face.
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
