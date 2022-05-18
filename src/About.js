import Member from "./Member"
import lzfPhoto from "./img/member/zefan-lu.png"
import xgyPhoto from "./img/member/geyang-xu.jpg"
import yszPhoto from "./img/member/shangzhen-yang.png"
import zslPhoto from "./img/member/shanglin-zeng.png"

const MEMBERS = [{
	photo: lzfPhoto,
	name: "Luke (Zefan) Lu",
	intro: "I'm a sophomore student from University of Washington major in Informatics and Applied Mathematics, also a member of the DAIS Research Group."
}, {
	photo: zslPhoto,
	name: "Shanglin Zeng",
	intro: "Hi everyone, I'm a junior student major in Economics and minor in Informatics and Data Science. Nice to meet you guys!"
}, {
	photo: yszPhoto,
	name: "Shangzhen Yang",
	intro: "Hi! My name is Shangzhen Yang. I am a sophomore student at University of Washington majoring in Informatics."
}, {
	photo: xgyPhoto,
	name: "Geyang Xu",
	intro: "Hi everyone! I'm Geyang, currently a sophomore at University of Washington. I'm applying for Informatics major and planning on a statistics minor."
}]

function About() {
	return <main className="about">
		<h1>About Us</h1>
		<h2>This is our Team</h2>
		<div className="team">
			{MEMBERS.map((info, index) =>
				<Member key={index} info={info} />
			)}
		</div>
	</main>
}

export default About
