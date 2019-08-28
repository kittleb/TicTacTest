class MoveController < ApplicationController
	attr_accessor :aiPlayer, :humanPlayer
  
	def index
	end

	def create
		originalBoard = params['board']
		@aiPlayer = params['aiPlayer']
		@humanPlayer = params['humanPlayer']

		bestSpot = minmax(originalBoard, @aiPlayer)

		render :json => { board: bestSpot }
	end

	def emptyIndices(board)
  		board = board.select { |elem| elem != "O" && elem != "X" }
  	end

  	def is_winner?(board,player)
  		if (
  				(board[0] == player && board[1] == player && board[2] == player) ||
		        (board[3] == player && board[4] == player && board[5] == player) ||
		        (board[6] == player && board[7] == player && board[8] == player) ||
		        (board[0] == player && board[3] == player && board[6] == player) ||
		        (board[1] == player && board[4] == player && board[7] == player) ||
		        (board[2] == player && board[5] == player && board[8] == player) ||
		        (board[0] == player && board[4] == player && board[8] == player) ||
		        (board[2] == player && board[4] == player && board[6] == player)
  			)
  			return true
  		else
  			return false
  		end
  	end

  	def minmax(newBoard,player)

		availableSpots = emptyIndices(newBoard)

		@score = 0

		if is_winner?(newBoard, @humanPlayer)
			@score = -10
			return { score: @score }
		elsif is_winner?(newBoard, @aiPlayer)
			@score = 10
			return { score: @score }
		elsif availableSpots.size === 0
			@score = 0
			return { score: @score }
		end

		# Array to collect all the move hashes
		moves = []

		availableSpots.size.times do |i|

			move = {}
			move[:index] = newBoard[availableSpots[i]]

			newBoard[availableSpots[i]] = player

			if player == @aiPlayer
				result = minmax(newBoard,@humanPlayer)
				move[:score] = result[:score]
			else
				result = minmax(newBoard, @aiPlayer)
				move[:score] = result[:score]
			end

			newBoard[availableSpots[i]] = move[:index]

			moves.push(move)
		end

		bestMove = 0

		if player == aiPlayer
			bestScore = -10000
			moves.size.times do |i|
				if moves[i][:score] > bestScore
					bestScore = moves[i][:score]
					bestMove = i
        		end
			end
		else
			bestScore = 10000
			moves.size.times do |i|
				if moves[i][:score] < bestScore
					bestScore = moves[i][:score];
        			bestMove = i;
				end
			end
		end

		moves[bestMove]		
  	end
  	


end
