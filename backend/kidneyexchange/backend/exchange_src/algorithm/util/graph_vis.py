import networkx as nx 
import matplotlib.pyplot as plt 

from .flatten import flatten


class GraphVisualization: 
  def __init__(self):
    # visual is a list which stores all  
    # the set of edges that constitutes a 
    # graph
    self.edges = []
    self.vertices = []
    self.vertices_color = []
    self.G = nx.DiGraph()

    self.color_list = {
      "rb": ['red', 'blue'],
      "yg": ['yellow', 'green']
    }


  # addEdge function inputs the vertices of an 
  # edge and appends it to the visual list 
  def add_edge(self, a, b):
    temp = [a, b]
    self.edges.append(temp)


  def add_edges_from(self, list_of_edges):
    self.edges += list_of_edges


  def add_vertices_from(self, list_of_vertices):
    self.vertices += list_of_vertices


  def add_color(self, no_edge_color, edgy_color):
    all_vertices_with_edge = flatten(self.edges)
    for vertex in self.vertices:
      if (vertex not in all_vertices_with_edge):
        self.vertices_color.append(no_edge_color)
      else:
        self.vertices_color.append(edgy_color)


  def visualize(self, color='default'):
    self.G.add_nodes_from(self.vertices)
    self.G.add_edges_from(self.edges)
    if (color == "default"):
      nx.draw_networkx(self.G)
    elif (color in self.color_list):
      self.add_color(self.color_list[color][0], self.color_list[color][1])
      nx.draw_networkx(self.G, node_color=self.vertices_color)
    else:
      raise ValueError("Color doesn't exist, existing colors =", list(self.color_list.keys()))
    
    plt.show()
