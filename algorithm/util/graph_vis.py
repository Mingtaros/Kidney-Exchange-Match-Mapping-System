import networkx as nx 
import matplotlib.pyplot as plt 


class GraphVisualization: 
  def __init__(self):
    # visual is a list which stores all  
    # the set of edges that constitutes a 
    # graph
    self.edges = []
    self.vertices = []
    self.G = nx.DiGraph()

  # addEdge function inputs the vertices of an 
  # edge and appends it to the visual list 
  def add_edge(self, a, b):
    temp = [a, b]
    self.edges.append(temp)

  def add_edges_from(self, list_of_edges):
    self.edges += list_of_edges

  def add_vertices_from(self, list_of_vertices):
    self.vertices += list_of_vertices

  # In visualize function G is an object of 
  # class Graph given by networkx G.add_edges_from(visual) 
  # creates a graph with a given list 
  # nx.draw_networkx(G) - plots the graph 
  # plt.show() - displays the graph 
  def visualize(self):
    self.G.add_nodes_from(self.vertices)
    self.G.add_edges_from(self.edges)
    nx.draw_networkx(self.G)
    plt.show()
