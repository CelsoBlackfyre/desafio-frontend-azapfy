"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
	const [metahumans, setMetahumans] = useState([]);
	const [palavra, setPalavra] = useState("");
	const [busca, setBusca] = useState();
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

	return (
		<div className="container mx-auto p-4">
			<div>
				<input
					className="text-black"
					type="text"
					value={palavra}
					onChange={(e) => setPalavra(e.target.value)}
					placeholder="Pesquisar"
				/>
			</div>
			<h1 className="text-3xl font-bold mb-4">Lista de Heróis</h1>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{busca.map((metahuman) => (
					<li
						key={metahuman["id"]}
						className="bg-white rounded-lg shadow-md p-4">
						<p className="text-xl font-bold mb-2">{metahuman["name"]}</p>
						<img src={metahuman["images"]["md"]} alt={metahuman["name"]} />
						<div className="mt-2">
							<p className="text-xl text-black">
								<strong>{metahuman["name"]}</strong>
							</p>
							<p className="text-black">
								<strong>Intelligence:</strong>{" "}
								{metahuman["powerstats"]["intelligence"]}
							</p>
							<p className="text-black">
								<strong>Strength:</strong> {metahuman["powerstats"]["strength"]}
							</p>
							<p className="text-black">
								<strong>Speed:</strong> {metahuman["powerstats"]["speed"]}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
