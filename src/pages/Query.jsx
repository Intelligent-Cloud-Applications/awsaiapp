import React from 'react'

export default function query() {
  return (
    <div
  id="DesktopRoot"
  className="overflow-hidden bg-[#f0f0f0] flex flex-col pb-24 gap-16 w-full items-start"
>
  <div className="bg-white self-stretch flex flex-row justify-between items-start pt-2 px-8">
    <img
      src="https://file.rendit.io/n/lsVaYXmfL1fT3uclw5lG.png"
      id="Element1"
      className="mb-4 w-24 shrink-0"
    />
    <div className="flex flex-row justify-between mt-4 w-1/2 items-center">
      <div className="text-xl font-['Inter']">Home</div>
      <div className="text-xl font-['Inter']">About Us</div>
      <div className="text-xl font-['Inter']">Pricing</div>
      <div className="text-xl font-['Inter']">Our Team</div>
      <div className="border-solid border-[#30afbc] bg-white self-start flex flex-col w-24 shrink-0 h-10 items-center py-2 border-2 rounded-lg">
        <div className="text-xl font-['Inter'] font-bold">Login</div>
      </div>
      <div className="bg-[#30afbc] self-start flex flex-col justify-center pl-2 h-10 items-start rounded-lg">
        <div className="text-xl font-['Inter'] font-bold text-white mr-2">
          Contact us
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-row ml-[242px] gap-px w-2/3 items-start">
    <div className="shadow-[0px_4px_4px_0px_#30afbc] overflow-hidden bg-[#0091a0] flex flex-col justify-end gap-10 w-1/2 items-center pt-12 pb-6 px-8 rounded-tl-[33px] rounded-bl-[33px]">
      <img
        src="https://file.rendit.io/n/jHgoQ0ZmFQ7S0ZMqnwcR.png"
        className=""
      />
      <div className="self-stretch flex flex-col mr-16 gap-2 items-start">
        <div className="text-2xl font-['Poppins'] font-bold text-white">
          Let’s Chat.
          <br />
          Tell Us About Your
          {"  "}
          Project.
        </div>
        <div className="text-sm font-['Poppins'] font-semibold text-white">
          Let’s Maximize Your business's Potential with Us
        </div>
      </div>
    </div>
    <div className="shadow-[4px_4px_4px_0px_rgba(48,_175,_188,_0.72)] bg-white flex flex-col w-1/2 items-start pt-8 pb-12 px-12 rounded-tr-[33px] rounded-br-[33px]">
      <div
        id="SendUsAMessage"
        className="text-3xl font-['Poppins'] font-semibold mb-10"
      >
        Send
        {"  "}
        us
        {"  "}a message
      </div>
      <div className="text-xs font-['Poppins'] font-semibold text-black/85 ml-1">
        Full Name
      </div>
      <div className="border-solid self-stretch h-8 shrink-0 mb-1 ml-1 mr-10 border-black/47 border rounded-lg" />
      <div className="text-xs font-['Poppins'] font-semibold text-black/85 mb-px ml-1">
        Company Name
      </div>
      <div className="border-solid self-stretch h-8 shrink-0 ml-1 mr-10 border-black/47 border rounded-lg" />
      <div className="text-xs font-['Poppins'] font-semibold text-black/85 mb-px ml-1">
        Email
      </div>
      <div className="self-stretch relative flex flex-col pb-4 ml-1 mr-10">
        <div className="text-xs font-['Poppins'] font-semibold text-black/85 absolute top-8 left-px h-5 w-12">
          Address
        </div>
        <div className="border-solid relative h-8 shrink-0 border-black/47 border rounded-lg" />
      </div>
      <div className="border-solid self-stretch h-8 shrink-0 mb-px ml-1 mr-10 border-black/47 border rounded-lg" />
      <div className="text-xs font-['Poppins'] font-semibold text-black/85 mb-1 ml-1">
        Tell us more about your
        {"  "}
        project{" "}
      </div>
      <div className="border-solid self-stretch h-24 shrink-0 mb-6 ml-1 mr-10 border-black/47 border rounded-lg" />
      <div className="bg-[#30afbc] flex flex-col justify-center ml-1 pl-2 h-10 shrink-0 items-start rounded-lg">
        <div className="font-['Inter'] font-semibold text-white mr-2">
          Send message
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
