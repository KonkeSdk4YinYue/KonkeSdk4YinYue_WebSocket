//
//  KYWebSocket.swift
//  KonkeSdk4YinYue
//
//  Created by 吴伟城 on 2023/5/16.
//

import Foundation
import Starscream
import KonkeSdk4YinYue

fileprivate let tokenKey = "WebSocketManager_token"

@objc
public final class WebSocketManager: NSObject, KYWebSocketManager {
    public var delegate: KYWebSocketManagerDelegate?
    
    var socket: WebSocket?
    
    public var token: String? {
        get {
            UserDefaults.standard.string(forKey: tokenKey)
        }
        set {
            if let newValue = newValue, !newValue.isEmpty {
                UserDefaults.standard.set(newValue, forKey: tokenKey)
            } else {
                UserDefaults.standard.removeObject(forKey: tokenKey)
            }
        }
    }
    
    public var isConnected: Bool = false
    
    public func reconnect() {
        disconnect()
        guard let token = token else { return }
        let urlString = "wss://kapp.ikonke.com/ws/listener?authorization=\(token)"
        var request = URLRequest(url: URL(string: urlString)!)
        request.timeoutInterval = 5
        socket = WebSocket(request: request)
        socket?.delegate = self
        socket?.connect()
        socket?.write(ping: Data())
        
        //        hbTimer = Timer.scheduledTimer(withTimeInterval: 10, repeats: true, block: { timer in
        //            guard let socket = self.socket else {
        //                timer.invalidate()
        //                return
        //            }
        //            socket.write(ping: Data())
        //        })
    }
    
    public func disconnect() {
        guard let socket = socket else { return }
        socket.disconnect()
        self.socket = nil
        isConnected = false
        //        hbTimer?.invalidate()
    }
}

extension WebSocketManager: WebSocketDelegate {
    public func didReceive(event: Starscream.WebSocketEvent, client: Starscream.WebSocketClient) {
        switch event {
        case .connected(let headers):
            isConnected = true
            print("websocket is connected: \(headers)")
        case .disconnected(let reason, let code):
            isConnected = false
            print("websocket is disconnected: \(reason) with code: \(code)")
        case .text(let string):
            delegate?.onReceived(string)
        case .binary(let data):
            print("Received data: \(data.count)")
        case .ping(_):
            break
        case .pong(_):
            break
        case .viabilityChanged(_):
            break
        case .reconnectSuggested(_):
            reconnect()
        case .cancelled:
            isConnected = false
        case .error(let error):
            isConnected = false
            debugPrint("\(String(describing: error))")
        default:
            break
        }
    }
}
