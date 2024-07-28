"use client";
import { useState, useEffect } from "react";

// Componente do Modal
function Modal({ isOpen, onClose, vencedor }) {
	if (!isOpen || !vencedor) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
				<h2 className="text-2xl font-bold mb-4">Vencedor!</h2>
				<p className="text-xl font-bold mb-2">{vencedor.name}</p>
				<img
					src={vencedor.images.md}
					alt={vencedor.name}
					className="rounded-md mb-2"
				/>
				<div className="mt-2">
					<p>
						<strong>Inteligência:</strong> {vencedor.powerstats.intelligence}
					</p>
					<p>
						<strong>Força:</strong> {vencedor.powerstats.strength}
					</p>
					<p>
						<strong>Velocidade:</strong> {vencedor.powerstats.speed}
					</p>
					<p>
						<strong>Durabilidade:</strong> {vencedor.powerstats.durability}
					</p>
					<p>
						<strong>Poder:</strong> {vencedor.powerstats.power}
					</p>
					<p>
						<strong>Combate:</strong> {vencedor.powerstats.combat}
					</p>
				</div>
				<button
					onClick={onClose}
					className="mt-4 bg-blue-500 text-white p-2 rounded-md">
					Fechar
				</button>
			</div>
		</div>
	);
}

export default function Home() {
	const [metahumans, setMetahumans] = useState([]);
	const [palavra, setPalavra] = useState("");
	const [busca, setBusca] = useState([]);
	const [metahumanoSelecionado, setMetahumano] = useState([]);
	const [vencedor, setvencedor] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchHerois = () => {
		fetch("https://homologacao3.azapfy.com.br/api/ps/metahumans", {
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => setMetahumans(data));
	};

	useEffect(() => {
		fetchHerois();
	}, []);

	useEffect(() => {
		const resultado = metahumans.filter((metahuman) =>
			metahuman["name"].toLowerCase().includes(palavra.toLowerCase())
		);
		setBusca(resultado);
	}, [palavra, metahumans]);

	const handleSelect = (metahuman) => {
		if (metahumanoSelecionado.length < 2) {
			setMetahumano([...metahumanoSelecionado, metahuman]);
		} else {
			alert("Você pode selecionar apenas dois metahumanos para a batalha.");
		}
	};

	const calculatevencedor = () => {
		if (metahumanoSelecionado.length === 2) {
			const [m1, m2] = metahumanoSelecionado;
			const m1Stats =
				m1.powerstats.intelligence +
				m1.powerstats.strength +
				m1.powerstats.speed +
				m1.powerstats.durability +
				m1.powerstats.power +
				m1.powerstats.combat;
			const m2Stats =
				m2.powerstats.intelligence +
				m2.powerstats.strength +
				m2.powerstats.speed +
				m2.powerstats.durability +
				m2.powerstats.power +
				m2.powerstats.combat;
			setvencedor(m1Stats > m2Stats ? m1 : m2);
			setIsModalOpen(true);
			setMetahumano([]);
		} else {
			alert("Selecione dois metahumanos para a batalha.");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div>
				<input
					className="text-black p-2 border border-gray-300 rounded-md w-full"
					type="text"
					value={palavra}
					onChange={(e) => setPalavra(e.target.value)}
					placeholder="Pesquisar"
				/>
			</div>

			<h1 className="text-3xl font-bold mb-4">Lista de Heróis</h1>
			<button
				onClick={calculatevencedor}
				className="mt-4 bg-green-500 text-white p-2 rounded-md">
				Lutar!
			</button>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{busca.map((metahuman) => (
					<li
						key={metahuman["id"]}
						className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${
							metahumanoSelecionado.includes(metahuman)
								? "border-4 border-green-500"
								: ""
						}`}
						onClick={() => handleSelect(metahuman)}>
						<img
							src={metahuman["images"]["md"]}
							alt={metahuman["name"]}
							className="rounded-md mb-2"
						/>
						<div className="mt-2">
							<p className="text-xl text-black">
								<strong>{metahuman["name"]}</strong>
							</p>
							<hr className="my-2" />
							<p className="text-black">
								<strong>Inteligência:</strong>{" "}
								{metahuman["powerstats"]["intelligence"]}
							</p>
							<p className="text-black">
								<strong>Força:</strong> {metahuman["powerstats"]["strength"]}
							</p>
							<p className="text-black">
								<strong>Velocidade:</strong> {metahuman["powerstats"]["speed"]}
							</p>
							<p className="text-black">
								<strong>Durabilidade:</strong>{" "}
								{metahuman["powerstats"]["durability"]}
							</p>
							<p className="text-black">
								<strong>Poder:</strong> {metahuman["powerstats"]["power"]}
							</p>
							<p className="text-black">
								<strong>Combate:</strong> {metahuman["powerstats"]["combat"]}
							</p>
						</div>
					</li>
				))}
			</ul>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				vencedor={vencedor}
			/>
		</div>
	);
}
