import { UserRoundCheck } from "lucide-react";

export type UserDataProps = {
    name: string;
    email: string;
    image: any;
    time: string;
}

export default function UserDataCard(props: UserDataProps) {
    const defaultImage = "/mesh.jpeg";
    return (
      <div className="rounded-[5px] p-5 bg-secondary/90">
        <section className="flex justify-between gap-2 text-primary pb-2">
                <p>Recent Users</p>
                <UserRoundCheck className="h-4 w-4" />
        </section>
        <div className=" flex flex-wrap justify-between gap-3 pt-2">
          <section className="flex justify-between gap-3 ">
            <div className=" h-12 w-12 rounded-full bg-secondary/30">
              <img width={300} height={300} src={props.image || defaultImage} alt="avatar" className="rounded-full h-12 w-12"/>
            </div>
            <div className="text-sm">
              <p>{props.name}</p>
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-primary/30">
                {props.email}
            </div>
        </div>
      </section>
        <p className="text-sm">{props.time}</p>
    </div>
    </div>
    )
}