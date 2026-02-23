import './App.css';

function Header({children}:{children : React.ReactNode}) {
  return (
    <div>
      <header className='app-header'>
        <h1 className='app-title'>Movie-Info</h1>
      </header>
      {/* 下記に各コンポーネントが入る */}
      <main>{children}</main>
    </div>
  )
}

export default Header
