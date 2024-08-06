import Input from "@/components/Input/Input";
import IsLoadingBtn from "@/components/Loading/IsLoadingBtn";
import { Button } from "@/components/ui/button";
import { useSqliteAuthContext } from "@/Context/SqliteContext";
import { ChangeEvent, FC, FormEvent, FormEventHandler, useState } from "react";

const AddUser: FC = () => {
  const { signup, isLoading } = useSqliteAuthContext();
  const [userFormData, setUserFormData] = useState({
    user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    job_title: "",
    user_type: "",
    tenant_id: 1,
    email_addresses: "",
    password: "",
    confirm_password: "",
  });
  console.log(userFormData);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userFormData.password === userFormData.confirm_password) {
      signup(userFormData);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="text-center font-bold text-xl">User Information</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 p-3 items-center text-sm">
          <div className="flex gap-2">
            <Input
              autoFocus={true}
              type="text"
              name="first_name"
              value={userFormData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              label="First Name"
              required={true}
            />
            <Input
              type="text"
              name="middle_name"
              value={userFormData.middle_name}
              onChange={handleChange}
              placeholder="Middle Name"
              label="Middle Name"
            />
            <Input
              type="text"
              name="last_name"
              value={userFormData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              label="Last Name"
              required={true}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              name="user_name"
              value={userFormData.user_name}
              onChange={handleChange}
              placeholder="User Name"
              label="User Name"
              required={true}
            />
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="job_title">Job Title : </label>
              <select
                className="border rounded py-1 px-2"
                name="job_title"
                id="job_title"
                value={userFormData.job_title}
                onChange={handleChange}
                required
              >
                <option>None</option>
                <option value="full_stack">Full Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ui_designer">UI Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="user_type">User Type : </label>
              <select
                className="border rounded py-1 px-2"
                name="user_type"
                id="user_type"
                value={userFormData.user_type}
                onChange={handleChange}
                required
              >
                <option>None</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="client">Client</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tenant_id">Tenant Id : </label>
              <select
                className="border rounded py-1 px-2"
                name="tenant_id"
                id="tenant_id"
                value={userFormData.tenant_id}
                onChange={handleChange}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="email"
              name="email_addresses"
              value={userFormData.email_addresses}
              onChange={handleChange}
              placeholder="Email"
              label="Email"
              required={true}
            />
            <Input
              type="password"
              name="password"
              value={userFormData.password}
              onChange={handleChange}
              placeholder="Password"
              label="Password"
              required={true}
            />
            <Input
              type="password"
              name="confirm_password"
              value={userFormData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
              label="Confirm Password"
              required={true}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

{
  /* <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email Addresses</label>
              <input
                placeholder="Email"
                className="border rounded py-1 px-2"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="created_by">Created By</label>
              <input
              placeholder="Created By"
                className="border rounded py-1 px-2"
                type="text"
                name="created_by"
                id="created_by"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="tenant_id">Tenant Id</label>
              <input
              placeholder="Tenant Id"
                className="border rounded py-1 px-2"
                type="text"
                name="tenant_id"
                id="tenant_id"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                placeholder=" Password"
                className="border rounded py-1 px-2"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                placeholder="Confirm Password"
                className="border rounded py-1 px-2"
                type="password"
                name="confirm_password"
                id="confirm_password"
              />
            </div>
          </div> */
}
{
  /* <div className="flex flex-col gap-1">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    placeholder="First Name"
                    className="border rounded py-1 px-2"
                    type="text"
                    name="first_name"
                    id="first_name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="middle_name">Middle Name</label>
                  <input
                    placeholder="Middle Name"
                    className="border rounded py-1 px-2"
                    type="text"
                    name="middle_name"
                    id="middle_name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    placeholder="Last Name"
                    className="border rounded py-1 px-2"
                    type="text"
                    name="last_name"
                    id="last_name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="user_type">User Type</label>
                  <input
                    placeholder="User Type"
                    className="border rounded py-1 px-2"
                    type="text"
                    name="user_type"
                    id="user_type"
                  />
                </div> */
}
// const [user_name, setUser_name] = useState<string | undefined>();
// const [first_name, setFirst_name] = useState<string>();
// const [middle_name, setMiddle_name] = useState<string>();
// const [last_name, setLast_name] = useState<string>();
// const [job_title, setJob_title] = useState<string>();
// const [user_type, setUser_type] = useState<string>();
// const [tenant_id, setTenant_id] = useState<string>();
// const [email_addresses, setEmail_addresses] = useState<string>();
// const [password, setPassword] = useState<string>();
// const [confirm_password, setConfirm_password] = useState<string>();

// const [created_by, setCreated_by] = useState<string>();
// const [created_on, setCreated_on] = useState<string>();
// const [last_update_by, setLast_update_by] = useState<string>();
// const [last_update_on, setLast_update_on] = useState<string>();
