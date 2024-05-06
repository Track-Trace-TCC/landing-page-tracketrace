import type { NextPage } from 'next';
import Link from 'next/link';
import worldImage from './assets/images/world_image.jpg'


export const metadata = {
  title: 'Track&Trace - Início',
  description: 'Sistema de rastreamento ideal para sua empresa.',
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
};

const Home: NextPage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen mt-16">
      <section id="inicio" className="flex flex-col md:flex-row items-center justify-between p-10 bg-[#E8E8EA]">
        <div className="md:w-1/2 p-6">
          <h1 className="text-4xl font-bold mb-4">O sistema de rastreamento ideal para sua empresa.</h1>
          <p className="mb-6">Proporcione controle total sobre suas entregas e ofereça aos seus clientes feedback em tempo real. Simplifique o gerenciamento logístico com nossa solução eficiente e intuitiva.</p>
          <Link href="/contact" className="bg-primary text-white py-2 px-4 rounded-md">Fale conosco</Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/world_image.svg" alt="Main visual" className="max-w-full h-auto" />
        </div>
      </section>

      <section id="vantagens" className="px-10 py-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Vantagens da Nossa Solução</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="px-6 py-6">
            <div className="flex justify-center items-center mb-4 bg-primary rounded-full w-14 h-14">
              <img src="/location_icon.svg" alt="Real-time Tracking" style={{ height: '35px' }} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">Rastreamento em Tempo Real</h3>
              <p>Saiba sempre onde estão suas encomendas e ofereça confiança aos seus clientes.</p>
            </div>
          </div>
          <div className="px-6 py-6">
            <div className="flex justify-center items-center mb-4 bg-primary rounded-full w-14 h-14">
              <img src="/feedback_icon.svg" alt="Transparent Feedback" style={{ height: '35px' }} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">Feedback Transparente</h3>
              <p>Fornecemos aos seus clientes informações claras sobre o status de suas encomendas.</p>
            </div>
          </div>
          <div className="px-6 py-6">
            <div className="flex justify-center items-center mb-4 bg-primary rounded-full w-14 h-14">
              <img src="/truck_icon.svg" alt="Logistic Management" style={{ height: '35px' }} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">Gerenciamento Logístico Simplificado</h3>
              <p>Simplifique seu processo logístico e economize tempo e recursos.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="flex flex-col md:flex-row items-center justify-between p-10 bg-[#E8E8EA]">
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold mb-6 md:text-left">Sobre nós</h2>
          <p className="text-lg">Somos especialistas em logística, comprometidos em simplificar processos. Combinamos tecnologia inovadora com foco no cliente para oferecer soluções logísticas. Junte-se a nós para uma logística mais inteligente e eficaz.</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/brainstorm_image.svg" alt="Team brainstorming" className="max-w-full h-auto" />
        </div>
      </section>


      <section id="contato" className="px-10 py-6 flex flex-col md:flex-row justify-between items-stretch bg-white">
        <div className="mb-6 md:mb-0 flex-1 flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Contato</h2>
          <div id="contato" className="flex-1 p-4 shadow-md rounded-lg text-xl px-6 py-12 bg-[#E8E8EA] flex flex-col justify-center text-wrap">
            <div className="flex items-center">
              <img src="/phone_icon.svg" alt="Phone" className="mr-2" />
              <span>(62) 99529-7245</span>
            </div>
            <div className="flex items-center mt-6">
              <img src="/phone_icon.svg" alt="Phone" className="mr-2" />
              <span>(62) 98279-7245</span>
            </div>
            <div className="truncate flex items-center mt-6">
              <img src="/email_icon.svg" alt="Email" className="mr-2" />
              <span>contato@tracketrace.com.br</span>
            </div>
            <div className="flex items-center mt-6">
              <img src="/gps_icon.svg" alt="Location" className="mr-2" />
              <span>Goiânia, Goiás - Brasil</span>
            </div>
          </div>
        </div>
        <div className="flex-1 md:ml-6 flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Fale conosco</h2>
          <div id="faleconosco" className="flex-1 p-4 shadow-md rounded-lg bg-[#E8E8EA] flex flex-col space-y-4">
            <form className="w-full flex-1 flex flex-col justify-between">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label htmlFor="name" className="block mb-2">Nome</label>
                  <input id="name" type="text" className="input p-1 rounded input-bordered w-full" />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label htmlFor="email" className="block mb-2">E-mail</label>
                  <input id="email" type="email" className="input p-1 rounded input-bordered w-full" />
                </div>
              </div>
              <label htmlFor="subject" className="block mb-2">Assunto</label>
              <input id="subject" type="text" className="input p-1 rounded input-bordered w-full mb-4" />
              <label htmlFor="message" className="block mb-2">Mensagem</label>
              <textarea id="message" className="textarea rounded p-1 textarea-bordered w-full mb-4"></textarea>
              <button type="submit" className="btn rounded px-6 py-2 bg-primary text-white w-full">Enviar</button>
            </form>
          </div>
        </div>
      </section>
    </div >
  );
};



export default Home;
