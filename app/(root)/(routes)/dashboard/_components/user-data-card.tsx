export type UserDataProps = {
  name: string
  email: string
  image: any
  time: string
}

export default function UserDataCard(props: UserDataProps) {
  const defaultImage = '/mesh.avif'
  return (
    <section className="flex justify-between gap-2 text-foreground">
      <div className="flex gap-3 h-12 w-12 rounded-full bg-secondary/30">
        <img
          width={300}
          height={300}
          src={props.image || defaultImage}
          alt="avatar"
          className="rounded-full h-12 w-12"
        />
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-1/2 sm:w-auto opacity-50">
            {props.email}
          </div>
        </div>
      </div>
      <p className="text-sm">{props.time}</p>
    </section>
  )
}
