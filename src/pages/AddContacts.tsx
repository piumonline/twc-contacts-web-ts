import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddContact from "../components/AddContact";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import Cookies from "js-cookie";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  gender: string;
  userId?: string;
}

function AddContacts () {

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);

    try {

      const token = Cookies.get("jwtToken"); // Retrieve the JWT token from cookies
      const headers = { Authorization: `Bearer ${token}` }; // Set the Authorization header

      const response = await axios.post(
        'http://localhost:3000/contacts/',
        {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          gender: formValues.gender,
          userId: formValues.userId,
        },{ headers }
      ); 

      console.log(response.data);
      console.log("added");
      navigate("/contacts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="background_home ">
    <div className="flex h-screen flex-col overflow-auto xl:overflow-hidden">
      <Logo />
      <div className="grow flex-col px-[204px] flex justify-center">
        <div className="flex-col text-left text-white">
        <section>
      <div className="pt-10">
        <p className="font-FutuBold inline text-left text-[50px] text-white mb-[61px]">
          New Contact
        </p>
        <form onSubmit={handleSubmit}>
          <div className="font-FutuLight mt-[61px] gap-[40px] flex flex-col xl:grid grid-rows-2 grid-flow-col text-[25px] text-[#083F46] mb-10">
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="full name"
              value={formValues.name}
              onChange={handleChange}
            />

            <input
              className="input-field"
              type="text"
              name="phone"
              placeholder="phone number"
              value={formValues.phone}
              onChange={handleChange}
            />
            <input
              className="input-field"
              type="text"
              name="email"
              placeholder="e-mail"
              value={formValues.email}
              onChange={handleChange}
            />
            <div className="text-white flex justify-between items-center gap-0 xl:max-w-[477px]">
              <p>Gender</p>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  className="mr-2 border-1 border-slate-50 bg-transparent mb-1 focus:ring-1 focus:ring-white text-secondary
                        "
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  className="mr-2 border-1 border-slate-50 bg-transparent mb-1 focus:ring-1 focus:ring-white text-secondary
                        "
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <AddContact name='add contact' />
        </form>
      </div>
    </section>
        </div>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  </div>   
  );
};

export default AddContacts;
