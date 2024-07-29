import { Button } from "@/components/ui/button";

const AddUser = () => {
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <div className="p-4 border-2 w-[60%] shadow-2xl rounded-md hover:shadow-login duration-300 flex flex-col items-center justify-center">
      <div className="text-center font-bold text-xl">User Informaton</div>
      <form>
        <div className="flex gap-2 p-3 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="user_name">User Name</label>
              <input
                autoFocus
                placeholder="User Name"
                className="border rounded py-1 px-2"
                type="text"
                name="user_name"
                id="user_name"
              />
            </div>
            <div className="flex flex-col gap-1">
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
            </div>
          </div>
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </div>
  );
};
export default AddUser;
