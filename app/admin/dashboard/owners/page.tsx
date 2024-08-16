import { NoSsr } from "@mui/material";
import { TUser } from "@/app/lib/definitions";
import { getOwnerList } from "@/app/lib/actions";
import AdminOwnerList from "./AdminOwnerList";

export default async function Page() {
  const data: (TUser & { bookNumber: number })[] = await getOwnerList();

  return (
    <div className=" grid h-full">
      <NoSsr>
        <AdminOwnerList data={data} />
      </NoSsr>
    </div>
  );
}
