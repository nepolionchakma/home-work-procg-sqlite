import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
const AddData = () => {
  // shadcn form
  const FormSchema = z.object({
    datasource_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    application_type: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    application_type_version: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_access_synchronization_status: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_transaction_synchronization_status: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    default_datasource: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datasource_name: "",
      description: "",
      application_type: "",
      application_type_version: "",
      last_access_synchronization_status: "",
      last_transaction_synchronization_status: "",
      default_datasource: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const [open, setOpen] = useState<boolean>(false);
  const openProperties = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-3 py-3">
            <Button className="bg-slate-400">Test Connection</Button>
            <Button>Save</Button>
            <Button>Save and Close</Button>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
          <h5>*Indicates required field</h5>
          <FormField
            control={form.control}
            name="datasource_name"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 ">
                <FormLabel className="w-[50%] text-right mt-1 text-amber-800">
                  * Datasource Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    autoFocus
                    className="py-3 h-0 w-[50%]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 ">
                <FormLabel className="w-[50%] text-right mt-1 text-amber-800">
                  Description
                </FormLabel>
                <FormControl>
                  <Input {...field} className="py-3 h-0 w-[50%]" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-3 p-2 items-center justify-center">
            <label htmlFor="" className="w-[50%] text-right text-amber-800">
              Application Type
            </label>
            <p className="w-[50%] ">EBS</p>
          </div>
          <div className="flex gap-3 p-2 items-center justify-center">
            <label htmlFor="" className="w-[50%] text-right text-amber-800">
              Application Type Version
            </label>
            <p className="w-[50%] ">R12</p>
          </div>
          <div className="flex gap-3 p-2 items-center">
            <label htmlFor="" className="w-[49%] text-right text-amber-800">
              Default Source
            </label>
            <input type="checkbox" className=" " />
          </div>
          <div className="flex gap-3 p-2 items-center justify-center">
            <label htmlFor="" className="w-[50%] text-right text-amber-800">
              Connector Type
            </label>
            <p className="w-[50%] ">Default</p>
          </div>
          <div className="flex gap-3 p-2 items-center justify-center">
            <label htmlFor="" className="w-[50%] text-right text-amber-800">
              Synchronization Type
            </label>
            <p className="w-[50%] ">Transaction, Access</p>
          </div>
          <div
            className={`${open && "bg-slate-50 "} flex flex-col rounded p-2`}
          >
            <div className="flex gap-3 font-bold">
              <ChevronDown
                onClick={openProperties}
                className={`${
                  open ? "bg-slate-300" : "bg-slate-50"
                } p-1 shadow-2xl rounded shadow-slate-400 cursor-pointer`}
              />
              <h4>Connector Properties</h4>
            </div>
            <div className={`${open ? "h-full" : "h-0 opacity-0 "} `}>
              <div className="flex gap-3 items-center justify-center">
                <label htmlFor="" className="w-[30%] text-right text-amber-800">
                  ERP Database Type
                </label>
                <p className="w-[50%] ">ORACLE</p>
              </div>
              <div className="flex gap-3 items-center justify-center">
                <label htmlFor="" className="w-[30%] text-right text-amber-800">
                  Hostname
                </label>
                <p className="w-[50%] ">xebsdb01.genesiscrudeoil.com</p>
              </div>
              <div className="flex gap-3 items-center justify-center">
                <label htmlFor="" className="w-[30%] text-right text-amber-800">
                  Service Name
                </label>
                <p className="w-[50%] ">EBSX</p>
              </div>
              <div className="flex gap-3 items-center justify-center">
                <label htmlFor="" className="w-[30%] text-right text-amber-800">
                  Port
                </label>
                <p className="w-[50%] ">1524</p>
              </div>
              <div className="flex gap-3 items-center justify-center">
                <label htmlFor="" className="w-[30%] text-right text-amber-800">
                  Usemame
                </label>
                <p className="w-[50%] ">apps</p>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center gap-3 ">
                    <FormLabel className="w-[30%] text-right mt-1 text-amber-800">
                      * Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="py-3 h-0 w-[50%]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/*
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
};
export default AddData;
