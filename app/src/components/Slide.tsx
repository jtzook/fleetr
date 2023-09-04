export default function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'white',
        background: 'rgba(0, 0, 0, .25)',
      }}
    >
      {children}
    </div>
  )
}
