'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  // Add or remove testimonials here following this format
  const testimonials = [
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Write customer / user testimonials here. Please make sure it is a real one & not a fake one. You can add as many as you want. In fact, the more the better since people like to see what others are saying about your product or service.'
    }
  ]

  return (
    <div>
      {/* Section Title */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="pb-4 text-4xl font-extrabold text-foreground">
          Testimonials
        </h2>
        <p className="text-md opacity-50 max-w-lg text-center">
          Describe your product / service here that will impress the user & want
          them to buy the product
        </p>
        <AvatarCircles />
      </div>
      {/* Testimonials Card*/}
      <div className="flex items-center justify-center my-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="py-4 px-0 bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default"
            >
              <CardContent className="py-0">
                <div className="flex">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                  </Avatar>

                  <CardTitle className="text-lg pl-2 text-foreground pt-1">
                    {testimonial.name}
                  </CardTitle>
                </div>
                <p className="pt-3 text-foreground/70">
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
