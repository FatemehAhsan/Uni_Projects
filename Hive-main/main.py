# In the Name of Allah

import pygame
from enum import Enum

pygame.init()

# width and  height for game window
display_width = 1200
display_height = 600
screen = pygame.display.set_mode((display_width, display_height))

pygame.display.set_caption('Hive')

clock = pygame.time.Clock()

dir = 'assets\\images\\'

iconImg = pygame.image.load(dir + "Q-w.png")
pygame.display.set_icon(iconImg)

# colors
grey = (200, 200, 200)

element_width = 48
element_height = 48

first_move = True
second_move = False
turn = None
clicked = False
saved_q_x = None
saved_q_y = None
saved_q_neighbors_list = None
mm_turn = 'max'

saved_b_x = None
saved_b_y = None
saved_b_neighbors_list = None

saved_s_x = None
saved_s_y = None
saved_s_neighbors_list = None

saved_g_x = None
saved_g_y = None
saved_g_neighbors_list = None
saved_g_neighbors_colors_list = None

height = 0

def heuristic(element, element_e, move, enemy):
    result = 0
    if enemy:
        if element_e.type == Type.Q:
            result += 6
        elif element_e.type == Type.B:
            result += -1
    else:
        if element_e.type == Type.Q:
            result -= 2
        elif element_e.type == Type.B:
            result += -1
    if move:
        if element.type == Type.Q:
            result += 1
        elif element.type == Type.B: 
            result += 2
    else:
        if element.type == Type.Q:
            result += 6
        elif element.type == Type.B: 
            result += 4
        else:
            result+= 7
    return result


def next_branch(element_e, element, move):
    global height
    height += 1
    for i in range(len(element_e.neighbors_colors_list)):
        if element_e.neighbors_colors_list[i] == Color.N:
            state = i
            last_element_x = element.x
            last_element_y = element.y
            element.x = element_e.x + dif_x_list[state]
            element.y = element_e.y + dif_y_list[state]
            if move:
                if(can_element_move(element)):
                    update_neighbors(element)
                    element.used = True
                    element.moving = False
                    if element.type == Type.Q:
                        save_q(element)
                    if element.type == Type.S:
                        save_s(element)
                    if element.type == Type.G:
                        save_g(element)
                    if element.type == Type.B:
                        save_b(element)
                    if mm_turn == 'max':
                        result = calc_min()
                    else: 
                        result = calc_max()
                    remove_from_neighbors(element)
                    element.moving = False
                    element.x = last_element_x
                    element.y = last_element_y
                    element.used = False
                    element.neighbors_list = element.last_moving_neighbors_list()
                    element.neighbors_colors_list = element.last_moving_color_neighbors_list()
            else:
                update_neighbors(element)
                element.used = True
                element.moving = False
                if element.type == Type.Q:
                    save_q(element)
                if element.type == Type.S:
                    save_s(element)
                if element.type == Type.G:
                    save_g(element)
                if element.type == Type.B:
                    save_b(element)
                if mm_turn == 'max':
                    result = calc_min()
                else: 
                    result = calc_max()
                remove_from_neighbors(element)
                element.moving = False
                element.x = last_element_x
                element.y = last_element_y
                element.used = False
                element.neighbors_list = element.last_moving_neighbors_list()
                element.neighbors_colors_list = element.last_moving_color_neighbors_list()     
    height -= 1                        
    return result

def calc_max():
    values = []
    global second_move, mm_turn
    mm_turn = 'max'
    if second_move:
        for element_e in player_b_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_w_elements:
                    second_move = False
                    values.append(next_branch(element_e, element, False))
                    second_move = True
                    
    else:
        for element_e in player_b_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_w_elements:
                    if element.used and player_w_elements[0].used:
                        values.append(next_branch(element_e, element, True))
                       
        for element_e in player_w_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_w_elements:
                    if element.used and player_w_elements[0].used:
                        values.append(next_branch(element_e, element, True))
                       

        element_used_cnt = 0
        for element_used in player_w_elements:
            if element_used.used:
                element_used_cnt += 1
        if player_w_elements[0].used or element_used_cnt < 3: 
            for element_e in player_w_elements:
                if element_e.used and has_exit_way(element_e):
                    for element in player_w_elements:
                        if not element.used:
                            values.append(next_branch(element_e, element, False))
                           

        else:
            selected_element = player_w_elements[0]
            element = selected_element
            for element_e in player_w_elements:
                if element_e.used and has_exit_way(element_e):
                    values.append(next_branch(element_e, element, False))
                    
    if height == 0:
        return values.index(max(values))
    print(values)
    return max(values)

def calc_min():
    global mm_turn
    mm_turn = 'min'
    values = []
    for element_e in player_w_elements:
        if element_e.used and has_exit_way(element_e):
            for element in player_b_elements:
                if element.used and player_b_elements[0].used:
                    if height < 6:
                        values.append(next_branch(element_e, element, True))
                    values.append(heuristic(element, element_e, element.used, True))                               
                    
    for element_e in player_b_elements:
        if element_e.used and has_exit_way(element_e):
            for element in player_b_elements:
                if element.used and player_b_elements[0].used:
                    if height < 6:
                        values.append(next_branch(element_e, element, True))
                    values.append(heuristic(element, element_e, element.used, True))
                    
    element_used_cnt = 0
    for element_used in player_b_elements:
        if element_used.used:
            element_used_cnt += 1
    if player_b_elements[0].used or element_used_cnt < 3: 
        for element_e in player_b_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_b_elements:
                    if height < 6:
                        values.append(next_branch(element_e, element, False))
                    values.append(heuristic(element, element_e, element.used, False))
                    
    else:
        selected_element = player_b_elements[0]
        element = selected_element
        for element_e in player_b_elements:
            if element_e.used and has_exit_way(element_e):
                if height < 6:
                    values.append(next_branch(element_e, element, False))
                values.append(heuristic(element, element_e, element.used, False))
                
    return min(values)

def player_w_run():
    global second_move
    selected_element_e = None
    selected_element = None
    state = None
    cnt = 0
    max_branch_index = calc_max()
    if second_move:
        for element_e in player_b_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_w_elements:
                    for i in range(len(element_e.neighbors_colors_list)):
                        if element_e.neighbors_colors_list[i] == Color.N:
                            state = i
                            virtual_element = Element(element_e.x + dif_x_list[state], element_e.y + dif_y_list[state])
                            if can_element_move(virtual_element):
                                if cnt == max_branch_index:
                                    selected_element = element
                                    selected_element_e = element_e
                                    break
                                cnt += 1
        second_move = False
    else:
        for element_e in player_b_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_w_elements:
                    if element.used and player_w_elements[0].used:
                        for i in range(len(element_e.neighbors_colors_list)):
                            if element_e.neighbors_colors_list[i] == Color.N:
                                state = i
                                virtual_element = Element(element_e.x + dif_x_list[state], element_e.y + dif_y_list[state])
                                if can_element_move(virtual_element):
                                    if cnt == max_branch_index:
                                        selected_element = element
                                        selected_element_e = element_e
                                        break
                                    cnt += 1
        for element_e in player_w_elements:
            if element_e.used and has_exit_way(element_e):
                for element in player_w_elements:
                    if element.used and player_w_elements[0].used:
                        for i in range(len(element_e.neighbors_colors_list)):
                            if element_e.neighbors_colors_list[i] == Color.N:
                                state = i
                                virtual_element = Element(element_e.x + dif_x_list[state], element_e.y + dif_y_list[state])
                                if can_element_move(virtual_element):
                                    if cnt == max_branch_index:
                                        selected_element = element
                                        selected_element_e = element_e
                                        break
                                    cnt += 1
        element_used_cnt = 0
        for element_used in player_w_elements:
            if element_used.used:
                element_used_cnt += 1
        if player_w_elements[0].used or element_used_cnt < 3: 
            for element_e in player_w_elements:
                if element_e.used and has_exit_way(element_e):
                    for element in player_w_elements:
                        if not element.used:
                            for i in range(len(element_e.neighbors_colors_list)):
                                if element_e.neighbors_colors_list[i] == Color.N:
                                    state = i
                                    if can_element_move(virtual_element):
                                        if cnt == max_branch_index:
                                            selected_element = element
                                            selected_element_e = element_e
                                            break
                                        cnt += 1
        else:
            selected_element = player_w_elements[0]
            element = selected_element
            for element_e in player_w_elements:
                if element_e.used and has_exit_way(element_e):
                    for i in range(len(element_e.neighbors_colors_list)):
                        if element_e.neighbors_colors_list[i] == Color.N:
                            state = i
                            if can_element_move(virtual_element):
                                if cnt == max_branch_index:
                                    selected_element = element
                                    selected_element_e = element_e
                                    break
                                cnt += 1

    if not selected_element_e or not selected_element:
        swap_turn()
        return
    #print(player_w_elements.index(selected_element))
    #print(player_b_elements.index(selected_element_e))
    selected_element.x = selected_element_e.x + dif_x_list[state]
    selected_element.y = selected_element_e.y + dif_y_list[state]
    selected_element.used = True
    update_neighbors(selected_element)
    if selected_element.type == Type.Q:
        save_q(selected_element)
    if selected_element.type == Type.S:
        save_s(selected_element)
    if selected_element.type == Type.G:
        save_g(selected_element)
    if selected_element.type == Type.B:
        save_b(selected_element) 
    swap_turn()       
    print(maxH)


class Type(Enum):
    Q = 0
    A = 1
    G = 2
    B = 3
    S = 4


class Color(Enum):
    N = 0
    W = 1
    B = 2


class Turn(Enum):
    Player_w = 0
    Player_b = 1


dif_x_list = [0, element_width / 1.4, element_width / 1.4, 0, -element_width / 1.4, -element_width / 1.4]
dif_y_list = [-element_height / 1.4, -element_height / 2.8, element_height / 2.8, element_height / 1.4,
              element_height / 2.8, -element_height / 2.8]


def quit_game():
    pygame.quit()
    quit()


def element_display(path, x, y):
    image = pygame.transform.scale(pygame.image.load(path), (48, 48))
    screen.blit(image, (x - element_width / 2, y - element_height / 2))


def dif(x, y):
    if x < y:
        return y - x
    else:
        return x - y


def end():
    end_b = False
    if player_w_elements[0].neighbors_colors_list.count(Color.N) == 0:
        print("player w won")
        end_b = True
    if player_b_elements[0].neighbors_colors_list.count(Color.N) == 0:
        print("player b won")
        end_b = True
    if end_b:
        return True


class Element:
    def __init__(self, x, y, type=None, path=None, color=Color.N):
        self.x = x
        self.y = y
        self.type = type
        self.path = path
        self.color = color
        self.clicked = False
        self.neighbors_colors_list = [Color.N] * 6
        self.neighbors_list = [None] * 6
        self.used = False
        self.moving = False
        self.last_moving_color_neighbors_list = []
        self.last_moving_neighbors_list = []


display_x_player_w = display_width - 60
display_y_player_w = 60
display_x_player_b = display_width * 0.05
element_gap = 40

player_w_elements = [Element(display_x_player_w, display_y_player_w, Type.Q, dir + "Q-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + element_gap, Type.A, dir + "A-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 2 * element_gap, Type.A, dir + "A-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 3 * element_gap, Type.A, dir + "A-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 4 * element_gap, Type.G, dir + "G-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 5 * element_gap, Type.G, dir + "G-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 6 * element_gap, Type.G, dir + "G-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 7 * element_gap, Type.B, dir + "B-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 8 * element_gap, Type.B, dir + "B-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 9 * element_gap, Type.S, dir + "S-w.png", Color.W),
                     Element(display_x_player_w, display_y_player_w + 10 * element_gap, Type.S, dir + "S-w.png", Color.W)]

player_b_elements = [Element(display_x_player_b, display_height * 0.1, Type.Q, dir + "Q-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + element_gap, Type.A, dir + "A-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 2 * element_gap, Type.A, dir + "A-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 3 * element_gap, Type.A, dir + "A-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 4 * element_gap, Type.G, dir + "G-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 5 * element_gap, Type.G, dir + "G-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 6 * element_gap, Type.G, dir + "G-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 7 * element_gap, Type.B, dir + "B-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 8 * element_gap, Type.B, dir + "B-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 9 * element_gap, Type.S, dir + "S-b.png", Color.B),
                     Element(display_x_player_b, display_height * 0.1 + 10 * element_gap, Type.S, dir + "S-b.png", Color.B)]


def get_state(element_1, element_2):
    # state according to element 2
    state = -1
    if dif(element_1.x, element_2.x) < 20 and element_1.y < element_2.y:
        state = 0
    elif element_1.x > element_2.x and element_1.y < element_2.y:
        state = 1
    elif element_1.x > element_2.x and element_1.y > element_2.y:
        state = 2
    elif dif(element_1.x, element_2.x) < 20 and element_1.y > element_2.y:
        state = 3
    elif element_1.x < element_2.x and element_1.y > element_2.y:
        state = 4
    elif element_1.x < element_2.x and element_2.y < element_2.y:
        state = 5
    return state


def check_white_colors(new_element):
    for element in player_w_elements:
        if element.used and pow(dif(new_element.x, element.x), 2) + pow(dif(new_element.y, element.y), 2) < pow(
                element_width, 2) and new_element != element and not element.moving:
            state = get_state(new_element, element)
            new_element.neighbors_colors_list[(state + 3) % 6] = Color.W
            new_element.neighbors_list[(state + 3) % 6] = element
        if dif(new_element.x, element.x) < 20 and dif(new_element.y, element.y) < 20:
            new_element.color = element.color


def check_black_colors(new_element):
    for element in player_b_elements:
        if element.used and pow(dif(new_element.x, element.x), 2) + pow(
                dif(new_element.y, element.y), 2) < pow(element_width,
                                                        2) and new_element != element and not element.moving:
            state = get_state(new_element, element)
            new_element.neighbors_colors_list[(state + 3) % 6] = Color.B
            new_element.neighbors_list[(
                                               state + 3) % 6] = element
        if dif(new_element.x, element.x) < 20 and dif(new_element.y, element.y) < 20:
            new_element.color = element.color


def check_colors(new_element):
    check_black_colors(new_element)
    check_white_colors(new_element)


def update_neighbors(new_element):
    for element in player_w_elements:
        if pow(dif(new_element.x, element.x), 2) + pow(dif(new_element.y, element.y), 2) < pow(
                element_width, 2) and new_element != element and element.used:
            state = get_state(new_element, element)
            element.neighbors_colors_list[state] = new_element.color
            element.neighbors_list[state] = new_element
            new_element.neighbors_colors_list[(state + 3) % 6] = Color.W
            new_element.neighbors_list[(state + 3) % 6] = element
            new_element.last_moving_color_neighbors_list = new_element.neighbors_colors_list.copy()
            new_element.last_moving_neighbors_list = new_element.neighbors_list.copy()
            element.last_moving_color_neighbors_list = element.neighbors_colors_list.copy()
            element.last_moving_neighbors_list = element.neighbors_list.copy()
    for element in player_b_elements:
        if pow(dif(new_element.x, element.x), 2) + pow(dif(new_element.y, element.y), 2) < pow(
                element_width, 2) and new_element != element and element.used:
            state = get_state(new_element, element)
            element.neighbors_colors_list[state] = new_element.color
            element.neighbors_list[state] = new_element
            new_element.neighbors_colors_list[(state + 3) % 6] = Color.B
            new_element.neighbors_list[(state + 3) % 6] = element
            new_element.last_moving_color_neighbors_list = new_element.neighbors_colors_list.copy()
            new_element.last_moving_neighbors_list = new_element.neighbors_list.copy()
            element.last_moving_color_neighbors_list = element.neighbors_colors_list.copy()
            element.last_moving_neighbors_list = element.neighbors_list.copy()


def remove_from_neighbors(moving_element):
    moving_element.moving = True
    for place in range(len(moving_element.neighbors_list)):
        if moving_element.neighbors_list[place] is not None:
            moving_element.neighbors_list[place].neighbors_list[(place + 3) % 6] = None
            moving_element.neighbors_list[place].neighbors_colors_list[(place + 3) % 6] = Color.N
            moving_element.neighbors_list[place].last_moving_color_neighbors_list = moving_element.neighbors_list[
                place].neighbors_colors_list.copy()
            moving_element.neighbors_list[place].last_moving_neighbors_list = moving_element.neighbors_list[
                place].neighbors_list.copy()
            moving_element.neighbors_list[place] = None
            moving_element.neighbors_colors_list[place] = Color.N
            moving_element.last_moving_color_neighbors_list = moving_element.neighbors_colors_list.copy()


def save_q(element):
    global saved_q_x, saved_q_y, saved_q_neighbors_list
    saved_q_x = element.x
    saved_q_y = element.y
    saved_q_neighbors_list = element.neighbors_colors_list.copy()


def save_g(element):
    global saved_g_x, saved_g_y, saved_g_neighbors_list
    saved_g_x = element.x
    saved_g_y = element.y
    saved_g_neighbor_colors_list = element.neighbors_colors_list.copy()
    saved_g_neighbors_list = element.neighbors_list.copy()
    element.last_moving_neighbors_list = element.neighbors_list.copy()


def save_b(element):
    global saved_b_x, saved_b_y, saved_b_neighbors_list
    saved_b_x = element.x
    saved_b_y = element.y
    saved_b_neighbors_list = element.neighbors_colors_list.copy()


def save_s(element):
    global saved_s_x, saved_s_y, saved_s_neighbors_list
    saved_s_x = element.x
    saved_s_y = element.y
    saved_s_neighbors_list = element.neighbors_colors_list.copy()
    element.last_moving_neighbors_list = element.neighbors_list.copy()


def swap_turn():
    global turn
    if turn == Turn.Player_b:
        turn = Turn.Player_w
        player_w_run()
    else:
        turn = Turn.Player_b
    print(turn)


def first_check(moving_element):
    global turn, first_move, second_move
    moving_element.used = True
    first_move = False
    second_move = True
    if moving_element.color == Color.B:
        turn = Turn.Player_b
    else:
        turn = Turn.Player_w
    swap_turn()


def player_w_add(moving_element):
    for element in player_w_elements:
        if pow(dif(moving_element.x, element.x), 2) + pow(dif(moving_element.y, element.y), 2) < pow(
                element_width, 2) and moving_element != element \
                and element.used:
            state = get_state(moving_element, element)
            virtual_element = Element(element.x + dif_x_list[state], element.y + dif_y_list[state])
            check_white_colors(virtual_element)
            if virtual_element.neighbors_colors_list.count(Color.B) == 0:
                moving_element.x = element.x + dif_x_list[state]
                moving_element.y = element.y + dif_y_list[state]
                update_neighbors(moving_element)
                moving_element.used = True
                moving_element.moving = False
                if moving_element.type == Type.Q:
                    save_q(moving_element)
                if moving_element.type == Type.S:
                    save_s(moving_element)
                if moving_element.type == Type.G:
                    save_g(moving_element)
                if moving_element.type == Type.B:
                    save_b(moving_element)
                swap_turn()


def player_b_add(moving_element):
    for element in player_b_elements:
        if pow(dif(moving_element.x, element.x), 2) + pow(dif(moving_element.y, element.y), 2) < pow(
                element_width, 2) and moving_element != element \
                and element.used:
            state = get_state(moving_element, element)
            virtual_element = Element(element.x + dif_x_list[state], element.y + dif_y_list[state])
            check_white_colors(virtual_element)
            if virtual_element.neighbors_colors_list.count(Color.W) == 0:
                moving_element.x = element.x + dif_x_list[state]
                moving_element.y = element.y + dif_y_list[state]
                update_neighbors(moving_element)
                moving_element.used = True
                moving_element.moving = False
                if moving_element.type == Type.Q:
                    save_q(moving_element)
                if moving_element.type == Type.S:
                    save_s(moving_element)
                if moving_element.type == Type.G:
                    save_g(moving_element)
                if moving_element.type == Type.B:
                    save_b(moving_element)
                swap_turn()


def player_move(moving_element):
    if moving_element.type == Type.Q:
        q_move(moving_element)
    elif moving_element.type == Type.A:
        a_move(moving_element)
    elif moving_element.type == Type.G:
        g_move(moving_element)
    elif moving_element.type == Type.B:
        b_move(moving_element)
    elif moving_element.type == Type.S:
        s_move(moving_element)

def get_q_state(moving_element):
    if pow(dif(moving_element.x, saved_q_x), 2) + pow(dif(moving_element.y, saved_q_y), 2) < pow(element_width, 2):
        if dif(moving_element.x, saved_q_x) < 20 and moving_element.y < saved_q_y:
            return 0
        elif moving_element.x > saved_q_x and moving_element.y < saved_q_y:
            return 1
        elif moving_element.x > saved_q_x and moving_element.y > saved_q_y:
            return 2
        elif dif(moving_element.x, saved_q_x) < 20 and moving_element.y > saved_q_y:
            return 3
        elif moving_element.x < saved_q_x and moving_element.y > saved_q_y:
            return 4
        elif moving_element.x < saved_q_x and moving_element.y < saved_q_y:
            return 5
        return -1

def can_q_move(moving_element):
    if get_q_state(moving_element) > -1:
        return True
    else:
        return False    

def q_move(moving_element):
    if pow(can_q_move(moving_element)):
        state = get_q_state(moving_element)
        if saved_q_neighbors_list[state] == Color.N and saved_q_neighbors_list.count(Color.N) < 6:
            virtual_element = Element(saved_q_x + dif_x_list[state], saved_q_y + dif_y_list[state])
            check_colors(virtual_element)
            if has_exit_way(virtual_element) and virtual_element.neighbors_colors_list.count(Color.N) < 6:
                moving_element.x = saved_q_x + dif_x_list[state]
                moving_element.y = saved_q_y + dif_y_list[state]
                moving_element.moving = False
                update_neighbors(moving_element)
                save_q(moving_element)
                swap_turn()


def a_move(moving_element):
    for element in player_w_elements:
        if pow(dif(moving_element.x, element.x), 2) + pow(dif(moving_element.y, element.y), 2) < pow(
                element_width, 2) and element.used:
            state = get_state(moving_element, element)
            if element.neighbors_colors_list[state] == Color.N:
                virtual_element = Element(element.x + dif_x_list[state], element.y + dif_y_list[state])
                check_colors(virtual_element)
                if has_exit_way(virtual_element) and virtual_element.neighbors_colors_list.count(Color.N) < 6:
                    moving_element.x = element.x + dif_x_list[state]
                    moving_element.y = element.y + dif_y_list[state]
                    moving_element.moving = False
                    update_neighbors(moving_element)
                    swap_turn()
                    return
    for element in player_b_elements:
        if pow(dif(moving_element.x, element.x), 2) + pow(dif(moving_element.y, element.y), 2) < pow(
                element_width, 2) and moving_element != element and element.used:
            state = get_state(moving_element, element)
            if element.neighbors_colors_list[state] == Color.N:
                virtual_element = Element(element.x + dif_x_list[state], element.y + dif_y_list[state])
                check_colors(virtual_element)
                if has_exit_way(virtual_element) and virtual_element.neighbors_colors_list.count(Color.N) < 6:
                    moving_element.x = element.x + dif_x_list[state]
                    moving_element.y = element.y + dif_y_list[state]
                    moving_element.moving = False
                    update_neighbors(moving_element)
                    swap_turn()
                    return

def can_g_move(moving_element):
    virtual_element = Element(moving_element.x, moving_element.y)
    check_colors(virtual_element)
    for element in virtual_element.neighbors_list:
        if element is not None:
            state = get_state(element, virtual_element)
            found_element = virtual_element.neighbors_list[state]
            next_element = moving_element.last_moving_neighbors_list[(state + 3) % 6]

            while next_element is not found_element and next_element is not None:
                next_element = next_element.neighbors_list[(state + 3) % 6]
            
            if next_element is found_element and next_element is not None:
                return True
    return False

def g_move(moving_element):
    virtual_element = Element(moving_element.x, moving_element.y)
    check_colors(virtual_element)
    for element in virtual_element.neighbors_list:
        if element is not None:
            state = get_state(element, virtual_element)
            found_element = virtual_element.neighbors_list[state]
            next_element = moving_element.last_moving_neighbors_list[(state + 3) % 6]

            while next_element is not found_element and next_element is not None:
                next_element = next_element.neighbors_list[(state + 3) % 6]

            if next_element is found_element and next_element is not None:
                moving_element.x = next_element.x + dif_x_list[(state + 3) % 6]
                moving_element.y = next_element.y + dif_y_list[(state + 3) % 6]
                moving_element.moving = False
                update_neighbors(moving_element)
                save_g(moving_element)
                swap_turn()

def can_b_move(moving_element):
    state = -1
    if pow(dif(moving_element.x, saved_b_x), 2) + pow(dif(moving_element.y, saved_b_y), 2) < pow(element_width, 2):
        if dif(moving_element.x, saved_b_x) < 20 and moving_element.y < saved_b_y:
            state = 0
        elif moving_element.x > saved_b_x and moving_element.y < saved_b_y:
            state = 1
        elif moving_element.x > saved_b_x and moving_element.y > saved_b_y:
            state = 2
        elif dif(moving_element.x, saved_b_x) < 20 and moving_element.y > saved_b_y:
            state = 3
        elif moving_element.x < saved_b_x and moving_element.y > saved_b_y:
            state = 4
        elif moving_element.x < saved_b_x and moving_element.y < saved_b_y:
            state = 5
    if state > -1:
        return True
    return False

    
def b_move(moving_element):
    if pow(dif(moving_element.x, saved_b_x), 2) + pow(dif(moving_element.y, saved_b_y), 2) < pow(element_width, 2):
        state = -1
        if dif(moving_element.x, saved_b_x) < 20 and moving_element.y < saved_b_y:
            state = 0
        elif moving_element.x > saved_b_x and moving_element.y < saved_b_y:
            state = 1
        elif moving_element.x > saved_b_x and moving_element.y > saved_b_y:
            state = 2
        elif dif(moving_element.x, saved_b_x) < 20 and moving_element.y > saved_b_y:
            state = 3
        elif moving_element.x < saved_b_x and moving_element.y > saved_b_y:
            state = 4
        elif moving_element.x < saved_b_x and moving_element.y < saved_b_y:
            state = 5
        moving_element.x = saved_b_x + dif_x_list[state]
        moving_element.y = saved_b_y + dif_y_list[state]
        moving_element.moving = False
        update_neighbors(moving_element)
        save_b(moving_element)
        swap_turn()

def can_s_move(moving_element):
    virtual_element = Element(saved_s_x, saved_s_y)
    check_colors(virtual_element)
    for i in range(len(virtual_element.neighbors_list)):
        neighbor_element_1 = Element(virtual_element.x + dif_x_list[i], virtual_element.y + dif_y_list[i])
        for j in range(len(neighbor_element_1.neighbors_list)):
            neighbor_element_2 = Element(neighbor_element_1.x + dif_x_list[j], neighbor_element_1.y + dif_y_list[j])
            for k in range(len(neighbor_element_2.neighbors_list)):
                neighbor_element_3 = Element(neighbor_element_2.x + dif_x_list[k], neighbor_element_2.y + dif_y_list[k])
                if dif(neighbor_element_3.x, moving_element.x) < 20 and dif(neighbor_element_3.y, moving_element.y) < 20 and neighbor_element_3.neighbors_colors_list.count(Color.N) > 0 and neighbor_element_3.color is Color.N:
                    return True
    return False

def s_move(moving_element):
    virtual_element = Element(saved_s_x, saved_s_y)
    check_colors(virtual_element)
    for i in range(len(virtual_element.neighbors_list)):
        neighbor_element_1 = Element(virtual_element.x + dif_x_list[i], virtual_element.y + dif_y_list[i])
        for j in range(len(neighbor_element_1.neighbors_list)):
            neighbor_element_2 = Element(neighbor_element_1.x + dif_x_list[j], neighbor_element_1.y + dif_y_list[j])
            for k in range(len(neighbor_element_2.neighbors_list)):
                neighbor_element_3 = Element(neighbor_element_2.x + dif_x_list[k], neighbor_element_2.y + dif_y_list[k])
                if dif(neighbor_element_3.x, moving_element.x) < 20 and dif(neighbor_element_3.y, moving_element.y) < 20 and neighbor_element_3.neighbors_colors_list.count(Color.N) > 0 and neighbor_element_3.color is Color.N:
                    moving_element.x = neighbor_element_3.x
                    moving_element.y = neighbor_element_3.y
                    moving_element.moving = False
                    update_neighbors(moving_element)
                    save_s(moving_element)
                    swap_turn()

def can_element_move(moving_element):
    if moving_element.type == Type.Q:
        return can_q_move(moving_element)
    elif moving_element.type == Type.G:
        return can_g_move(moving_element)
    elif moving_element.type == Type.B:
        return can_b_move(moving_element)
    elif moving_element.type == Type.S:
        return can_s_move(moving_element)
    return True

def has_exit_way(element):
    empty_seen = 0
    if element.neighbors_colors_list[0] == Color.N and element.neighbors_colors_list[5] == Color.N:
        return True
    for place in range(len(element.neighbors_colors_list)):
        if empty_seen > 1:
            return True
        if element.neighbors_colors_list[place] == Color.N:
            empty_seen += 1
        elif element.neighbors_colors_list[place] != Color.N:
            empty_seen = 0
    return False


def being_hive(neighbors_colors_list):
    color_seen = False
    empty_seen = False
    for place in range(len(neighbors_colors_list)):
        if neighbors_colors_list[place] != Color.N and not color_seen:
            color_seen = True
        elif neighbors_colors_list[place] == Color.N and color_seen:
            empty_seen = True
        elif neighbors_colors_list[place] != Color.N and color_seen and empty_seen:
            if neighbors_colors_list[0] != Color.N and place == 5:
                return True
            else:
                return False
    return True


def player_b_can_play():
    usable_element_cnt = 0
    player_b_usable_element_cnt = 0
    for element in player_b_elements:
        if element.used and has_exit_way(element):
            usable_element_cnt += 1
            player_b_usable_element_cnt += 1
    for element in player_w_elements:
        if element.used and has_exit_way(element):
            usable_element_cnt += 1
    element_free_cnt = 0
    for element_used in player_b_elements:
        if not element_used.used:
            element_free_cnt += 1
    if (player_b_usable_element_cnt > 0 and player_b_elements[0].used and usable_element_cnt > 1) or (
            element_free_cnt > 0 and player_b_usable_element_cnt > 0):
        return True
    return False


def player_w_can_play():
    usable_element_cnt = 0
    player_w_usable_element_cnt = 0
    for element in player_w_elements:
        if element.used and has_exit_way(element):
            usable_element_cnt += 1
            player_w_usable_element_cnt += 1
    for element in player_b_elements:
        if element.used and has_exit_way(element):
            usable_element_cnt += 1
    element_free_cnt = 0
    for element_used in player_w_elements:
        if not element_used.used:
            element_free_cnt += 1
    if (player_w_usable_element_cnt > 0 and player_w_elements[0].used and usable_element_cnt > 1) or (
            element_free_cnt > 0 and player_w_usable_element_cnt > 0):
        return True
    return False


def game_loop():
    global clicked
    game_exit = False
    while not game_exit:

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                quit_game()

        if end():
            quit_game()
        mouse = pygame.mouse.get_pos()
        click = pygame.mouse.get_pressed()
        screen.fill(grey)

        for element in player_b_elements:
            element_display(element.path, element.x, element.y)

        for element in player_w_elements:
            element_display(element.path, element.x, element.y)

        for element in player_b_elements:
            if element.x + element_width / 5 > mouse[
                0] > element.x - element_width / 5 and element.y + element_height / 5 > mouse[
                1] > element.y - element_height / 5:
                if click[0] == 1 and not element.clicked and not clicked:
                    element.clicked = True
                    if element.used:
                        if being_hive(element.last_moving_color_neighbors_list) and has_exit_way(element):
                            remove_from_neighbors(element)
                        else:
                            element.clicked = False
                    if element.clicked:
                        clicked = True
            if click[0] == 1 and element.clicked:
                element.x = mouse[0]
                element.y = mouse[1]
            elif click[0] == 0 and element.clicked:
                element.clicked = False
                clicked = False
                if first_move:
                    first_check(element)
                    second_move = True
                elif turn == Turn.Player_b:
                    if player_b_can_play():
                        element_used_cnt = 0
                        for element_used in player_b_elements:
                            if element_used.used:
                                element_used_cnt += 1
                        if element_used_cnt < 3 or (element_used_cnt >= 3 and player_b_elements[0].used):
                            if element.used:
                                if player_b_elements[0].used and has_exit_way(element):
                                    player_move(element)
                            else:
                                player_b_add(element)
                    else:
                        swap_turn()

        for element in player_w_elements:
            if element.x + element_width / 5 > mouse[
                0] > element.x - element_width / 5 and element.y + element_height / 5 > mouse[
                1] > element.y - element_height / 5:
                if click[0] == 1 and not element.clicked and not clicked:
                    element.clicked = True
                    if being_hive(element.last_moving_color_neighbors_list) and has_exit_way(element):
                        remove_from_neighbors(element)
                    else:
                        element.clicked = False
                if element.clicked:
                    clicked = True
            if click[0] == 1 and element.clicked:
                element.x = mouse[0]
                element.y = mouse[1]
            elif click[0] == 0 and element.clicked:
                element.clicked = False
                clicked = False
                if first_move:
                    first_check(element)
                    second_move = True
                elif turn == Turn.Player_w:
                    if player_w_can_play():
                        element_used_cnt = 0
                        for element_used in player_w_elements:
                            if element_used.used:
                                element_used_cnt += 1
                        if element_used_cnt < 3 or (element_used_cnt >= 3 and player_w_elements[0].used):
                            if element.used:
                                if player_w_elements[0].used and has_exit_way(element):
                                    player_move(element)
                            else:
                                player_w_add(element)
                    else:
                        swap_turn()
        pygame.display.update()
        clock.tick(60)


game_loop()
