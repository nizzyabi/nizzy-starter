interface HeaderProps {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col  items-center justify-center">
      <h1 className="text-3xl font-bold ">{title}</h1>
    </div>
  )
}
