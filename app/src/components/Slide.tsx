export default function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '320px',
        height: '180px',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'white',
        // background: 'rgb(20, 21, 23)',
        background: 'red',
      }}
    >
      {children}
    </div>
  )
}
