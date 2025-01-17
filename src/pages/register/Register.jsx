import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { imageUpload } from "../../utils/ImageBbUpload";
import useAuth from "../../hooks/useAuth";
import animationData from "../../assets/register.json";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginBg from "../../assets/login.jpg";
import Lottie from "lottie-react";

const Register = () => {
  const { createUser, updateUserProfile, saveToDb } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const handleUploadImageClick = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo) {
      const uploadedPhoto = await imageUpload(photo);
      // check if password is valid
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        setError("Password does not match requirements");
        return;
      }
      setError("");
      createUser(email, password)
        .then(() => {
          // add user to database
          const userData = {
            name: name,
            email: email,
            photo: uploadedPhoto,
            role: "user",
            timeStamp: Date.now(),
          };
          saveToDb(userData);

          toast.success("Registration Successfull!");
          setEmail(email);
          updateUserProfile({
            displayName: name,
            photoURL: uploadedPhoto,
          });
          navigate("/");
        })
        .catch(() => {});
    }
  };

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => setStep(step - 1);

  const steps = [
    {
      id: 1,
      name: "Email and Photo",
    },
    {
      id: 2,
      name: "Email and Password",
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:w-2/3 mx-auto grid place-items-center min-h-screen ">
        <div className="lg:flex justify-center items-center gap-10">
          {/* left side */}
          <div className="lg:w-1/2 flex justify-start mt-10">
            <Lottie
              className="w-full"
              animationData={animationData}
              loop={true}
            />
          </div>

          {/* Right side */}
          <div className="lg:w-[70%] mx-auto backdrop-blur-2xl shadow-lg rounded-xl mt-20 p-6 sm:p-8 text-secondary">
            <p className="text-center font-bold text-3xl mb-12">
              Join With Elite Travels!
            </p>
            <div className="w-full sm:flex-row flex-col flex items-center gap-[20px] sm:gap-[10px] px-8">
              {steps.map((stepItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[10px] w-full"
                >
                  <p
                    className={`${
                      step >= stepItem.id
                        ? "bg-primary text-white"
                        : "bg-secondary text-white"
                    } w-[30px] h-[30px] p-[20px] flex items-center justify-center text-[1.2rem] rounded-full bg-primary`}
                  >
                    {stepItem.id}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className={`${
                        step >= stepItem.id + 1 ? "bg-secondary" : "bg-gray-300"
                      } w-full h-[5px] rounded-full`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-4 w-full px-10 py-6 backdrop-blur-lg shadow-lg"
            >
              {step === 1 && (
                <>
                  <div className="flex flex-col gap-[25px] w-full">
                    <div className="w-full">
                      <label className="text-[1rem] text-gray-600">Name</label>{" "}
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-secondary"
                      />
                    </div>

                    <input
                      type="file"
                      name="image"
                      id="image"
                      required
                      className="hidden w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-secondary"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                    />
                    {!photo ? (
                      <div
                        className=" flex items-center justify-center flex-col gap-4 border-[#e5eaf2] border rounded-md py-6 cursor-pointer"
                        onClick={handleUploadImageClick}
                      >
                        <FiUpload className="text-[2rem] text-[#777777]" />
                        <p className="text-[#777777]">
                          Browse to upload your file
                        </p>
                      </div>
                    ) : (
                      <div className="relative w-[80%] h-[300px]">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="uploaded"
                          className="w-full h-full object-cover"
                        />
                        <MdDelete
                          className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                          onClick={() => setPhoto(null)}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex flex-col gap-[25px] w-full">
                    <div className="w-full">
                      <label className="text-[1rem] text-gray-600">Email</label>{" "}
                      <br />
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                        className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-[1rem] text-gray-600">
                        Password
                      </label>
                      <br />
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="*********"
                        required
                        className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                </>
              )}
              <p className="text-red-600 pt-2">{error}</p>

              <div className="w-full flex items-end justify-end mt-6">
                <button
                  disabled={step <= 1}
                  type="button"
                  onClick={handlePrevStep}
                  className={`${
                    step <= 1 && "cursor-not-allowed"
                  } text-[1rem] text-secondary px-6 py-2.5`}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  onClick={handleNextStep}
                  className="bg-primary py-2.5 px-6 rounded-md text-white"
                >
                  {step === 2 ? "Submit" : "Next"}
                </button>
              </div>

              {/* Sign In Link */}
              <p className="mt-4 text-md text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline ml-2"
                >
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
