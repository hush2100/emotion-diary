import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log(`id: ${id}`);
  const mode = searchParams.get('mode');
  console.log(`mode: ${mode}`);
  return(
    <div>
      <h1>Edit</h1>
      <button onClick={() => setSearchParams({who: "sara"})}>params 바꾸기</button><br />
      <button onClick={() => {navigate('/home')}}>Home</button><br />
      <button onClick={() => {navigate(-1)}}>뒤로가기</button>
    </div>
  )
}
export default Edit;