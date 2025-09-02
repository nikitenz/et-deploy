import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContent from "../../context/AppContext";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


export default function EmailVerify({
  loading, 
  setMessage,
  otp,
  setError,
  setOtp,
}) {
    const {backendUrl} = useContext(AppContent);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
          otp,
        });

        if (res.data.success) {

          const { token, user } = res.data;

          localStorage.setItem("token", token); // we save this so we can use it for protected routes
          localStorage.setItem("user", JSON.stringify(user));

          setMessage("Email verified successfully!");


          setTimeout(() => {
            if (user.role === "admin"){
              navigate("/admin-dashboard");
            } else if (user.role === "faculty"){
              navigate("/faculty-dashboard");
            } else if (user.role === "hte"){
              navigate("/hte-dashboard");
            } else if (user.role === "student"){
              navigate("/student-dashboard");
            } else {
              navigate("/"); //fallback
            }
          }, 1500)
        } else {
          setMessage("Invalid OTP. Please try again.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong")
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleVerify} className="bg-white-shadow-lg rounded-2xl p-8 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Verify Your Account</h2>
          <InputOTP maxLength={6}
                    value={otp}
                    onChange={(val) => setOtp(val)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    );
}