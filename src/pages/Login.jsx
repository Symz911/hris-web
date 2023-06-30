import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { apiUrl, apiPort } from "../setting"

function Login() {
  const [tagId, setTagId] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    document.title = "HRIS - Login"
  }, [])

  const submit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://${apiUrl}:${apiPort}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        tag_id: tagId,
        password: password,
      }),
    })

    if (response.ok) {
      const content = await response.json()
      localStorage.setItem("employee-id", content.data.id)
      setRedirect(true)
      alert("Login berhasil, anda akan dialihkan ke halaman dashboard")
    } else {
      alert(`Login gagal, terjadi kesalahan, Error (${response.statusText})`)
    }
  }

  if (redirect) {
    return <Navigate to={"/dashboard"} />
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 m-5 shadow w-50 bg-light">
        <div className="card-body align-items-center">
          <h4 className="card-title text-center mt-3 mb-4">Login</h4>
          <form onSubmit={submit}>
            <div className="mb-2">
              <label htmlFor="inputKaryawanID" className="form-label">
                ID Karyawan
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="inputKaryawanID"
                placeholder="ID Karyawan"
                required
                onChange={(e) => setTagId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="inputPassword"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 col-5 mx-auto mt-5 mb-5">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="form_text text-center text-secondary">
              Belum punya akun? <a href="/register">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
