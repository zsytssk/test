# COMPONENT ENTITY SYSTEM

class Human:
    def __init__(self):
        self.height = 2
        self.position = (0,0)
        self.velocity = (0,0)
        self.sprite = '' #get_some_car_image()
        self.moveable = False
        self.rendered = False

class Renderer:
    def render(self,obj,screen):
        print 'rendering %s to %s' % (obj,screen)
        obj.rendered = True

class Mover:
    def Move(self,obj):
        print 'Moving %s' % (obj)
        obj.moveable = True

man = Human()

renderer = Renderer()
renderer.render(man,'monitor 1')

mover = Mover()
mover.Move(man)

print man.moveable
print man.rendered

class Car:
def __init__(self):
self.color = "red"
self.position = 0, 0
self.velocity = 0, 0
self.sprite = get_some_car_image()

class CarMovement:
def drive(self, car, timedelta):
car.position[0] = car.velocity[0] * timedelta
car.position[1] = car.velocity[1] * timedelta
def stop(self):
car.velocity = 0, 0

class CarRenderer:
def render(self, car, screen):
screen.display(car.sprite)