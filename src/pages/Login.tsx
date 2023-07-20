import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Cookies from 'js-cookie';
import { setAuthToken } from '../Routes/auth';

interface FormValues {
  email: string;
  password: string;
}

function Login() {

  const navigate = useNavigate();

    const [formValues, setFormValues] = useState<FormValues>({
      email: '',
      password: '',
    }); // state for form values
    const [errorMessage, setErrorMessage] = useState<string>('');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formValues);
  
      try {
        const response = await axios.post('http://localhost:3000/users/auth/login', {
          email: formValues.email,
          password: formValues.password,
        });
 
        console.log('Logged in successfully');
        setAuthToken(response.data);
        navigate('/');
  
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.log('Invalid credentials');
          setErrorMessage('Invalid credentials');
        } else {
          console.log('An error occurred', error.message);
        }
      }
    };

    return (
      <main className="background_login">
        <section className=" min-h-screen flex flex-col lg:flex-row">
          <div className="bg-eclipce bg-cover bg-left bg-no-repeat lg:w-3/5 grid content-center pl-[122px] shrink-0 grow-1">
            <div className="font-FutuBold flex h-[487px] w-[477px] flex-col gap-[38px] text-left ">
              <div className="h-[157px] w-[253px] flex-grow leading-none text-white">
                <p className="inline font-FutuBold text-[50px] font-bold leading-[73px]">
                  Hi there,
                  <br />
                </p>
                <p className="inline font-FutuLight text-[35px] font-medium leading-[55px]">
                  Welcome to our Contract Portal
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-[38px] font-FutuLight text-[25px] text-[#083F46]">
                  <input
                    className="input-field"
                    type="text"
                    name="email"
                    placeholder="e-mail"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <input
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
  
                  <div>
                    <p className="text-white mx-10 text-sm">{errorMessage}</p>
                  </div>
  
                  <div className="flex items-center ">
                    <div className="flex h-12 w-[131px] items-center justify-center gap-2.5 rounded-[50px] px-2.5 py-[0] font-medium text-white [box-shadow-width:1px] [box-shadow:0px_0px_0px_1px_white_inset]">
                      <div>
                        <button
                          className="h-[50px] w-[58px] text-[25px] leading-[50px]"
                          type="submit"
                        >
                          login
                        </button>
                      </div>
                    </div>
                    <p className="text-white pl-4"> or </p>
                    <Link to="/register">
                      <p className="text-white underline underline-offset-4 px-4 font-FutuLight text-[20px]">
                        {" "}
                        Click here to Register{" "}
                      </p>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-2/5 h-2/5 order-first lg:order-2 flex shrink-1 justify-center items-center pt-56">
            {/* <div className="bg-slate-400 lg:order-1"> */}
            <Logo/>
          </div>
        </section>
      </main>
    );
}

export default Login