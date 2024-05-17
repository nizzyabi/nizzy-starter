'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'



export const Testimonials = () => {
    // Add or remove testimonials here
    const testimonials = [
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service..',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service..',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service..',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.',
    },
    {
        name: 'John Doe',
        avatar: '/testimonials/john-doe.jpg',
        message: 'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service..',
    },
    ]

    return (
        <div>
            {/* Section Title */}
            <div className="max-w-3xl pb-12 mx-auto text-center">
                <h2 className="pb-4 text-4xl font-extrabold text-primary">
                    Testimonials
                </h2>
            </div>
            {/* Testimonials Card*/}
            <div className='flex items-center justify-center'>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xs:mx-12 sm:mx-12 md:mx-40'>
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="py-4 px-0 m-3 bg-secondary border border-primary/20 rounded-[5px]">
                            <CardContent className='py-0'>
                                <div className='flex'>
                                    <Avatar className='h-7 w-7'>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    </Avatar>
                    
                                    <CardTitle className='text-lg pl-2 text-primary pt-1'>
                                        {testimonial.name}
                                    </CardTitle>
                                </div>
                                <p className='pt-3 text-primary/70'>
                                    "{testimonial.message}"
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}