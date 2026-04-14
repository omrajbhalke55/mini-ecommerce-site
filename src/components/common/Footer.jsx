import logo from '../../assets/logo.svg'

const Footer = () => {
    return (
        <>
            <footer className="bg-white px-6 pt-10 md:px-16 lg:px-36 w-full text-zinc-700">

                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-[#6B8A9B]/30 pb-10">

                    {/* LEFT SECTION */}
                    <div className="md:max-w-96">

                        {/* Logo + Brand */}
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="MediHAA logo" className="h-12 w-auto" />
                        </div>

                        <p className="mt-6 text-sm text-zinc-500 leading-relaxed">
                            MediHAA provides seamless healthcare solutions, making it easier
                            to access medicines, track health, and manage wellness from
                            anywhere.
                        </p>

                        {/* App Buttons */}
                        <div className="flex items-center gap-3 mt-5">
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                                alt="google play"
                                className="h-10 w-auto border border-[#6B8A9B]/40 rounded-lg hover:bg-[#F5FAFF] transition"
                            />
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                                alt="app store"
                                className="h-10 w-auto border border-[#6B8A9B]/40 rounded-lg hover:bg-[#F5FAFF] transition"
                            />
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex-1 flex items-start md:justify-end gap-16 md:gap-32">

                        {/* Company Links */}
                        <div>
                            <h2 className="font-semibold mb-5 text-black">Company</h2>
                            <ul className="text-sm space-y-3 text-zinc-600">
                                <li><a href="#" className="hover:text-[#2AA7A1] transition">Home</a></li>
                                <li><a href="#" className="hover:text-[#2AA7A1] transition">About us</a></li>
                                <li><a href="#" className="hover:text-[#2AA7A1] transition">Contact us</a></li>
                                <li><a href="#" className="hover:text-[#2AA7A1] transition">Privacy policy</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="font-semibold mb-5 text-black">Get in touch</h2>
                            <div className="text-sm space-y-3 text-zinc-600">
                                <p>+91 98765 43210</p>
                                <p>contact@medihaa.com</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM */}
                <p className="pt-5 text-center text-sm text-zinc-500 pb-6">
                    © {new Date().getFullYear()} MediHAA. All rights reserved.
                </p>

            </footer>
        </>
    )
}

export default Footer