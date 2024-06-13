const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-w-6xl w-full flex items-center justify-center px-6">
      {children}
    </main>
  )
}

export default DashboardLayout
