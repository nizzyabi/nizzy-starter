export type UserDataProps = {
  name: string
  email: string
  image: any
  time: string
}

export default function UserDataCard(props: UserDataProps) {
  const defaultImage = '/mesh.jpeg'
  return (
    <div className=" flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-secondary/30 ">
          <img
            width={300}
            height={300}
            src={props.image || defaultImage}
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
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
  )
}
