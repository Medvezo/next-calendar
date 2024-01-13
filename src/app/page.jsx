import Calendar from "@/components/Calendar";

export default function Home() {
	return (
		<main className="flex justify-center items-center flex-col border border-green-900 rounded-3xl">
			<h1>Calendar</h1>
			<Calendar />
		</main>
	);
}
