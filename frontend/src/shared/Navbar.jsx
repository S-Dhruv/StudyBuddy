import React from 'react'
import { Popover,PopoverContent,PopoverTrigger} from '../components/ui/popover'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../components/ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/userAuthStore';


const Navbar = () => {
    const {authUser, logout} = useAuthStore()
    console.log(authUser);
  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between h-16 mx-auto max-w-7xl '>
            <div>
                <h1 className='text-2xl font-bold'>Study<span className='text-[#29099f24]'>Planner</span></h1>
            </div>
            <div className="flex items-center gap-5">
                <ul className="flex items-center gap-8 ml-15 font-meduim">
                    <li>Home</li>
                    <li>Aboutus</li>
                    <li>Contactus</li>
                </ul> 
                        <div className="flex items-center gap-2"> 
                        {
                            authUser && <>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-12 h-12 ml-5 rounded-full"/>
                                            
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="flex gap-4 space-y-0.9">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-12 h-12 ml-5 rounded-full"/>
                                                
                                            </Avatar>
                                            <div>
                                            <h4 className='font-medium'>{authUser.user.name || "Karan" }</h4>
                                            </div>
                                        
                                        </div>
                                        <div className="flex flex-col text-gray-600">
                                            <div className="flex items-center gap-2 w-fit curser-pointer">
                                                <User2/>
                                                <Button variant="link">View Profile</Button>
                                            </div>
                                            <div className="flex items-center gap-2 w-fit curser-pointer">
                                                <LogOut/>
                                                <Button variant="link" onClick={logout}>Logout</Button>
                                                </div>
                                        
                                        </div>
                                        
                                    </PopoverContent>
                                </Popover>
                            </>

                        }

                        </div>
            </div>  
           
        </div>
       
    </div>
  )
}

export default Navbar   